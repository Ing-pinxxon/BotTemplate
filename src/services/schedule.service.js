// ============================================================
// SCHEDULE SERVICE
// Motor de horarios genérico con validación de días festivos.
// ============================================================

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import config from '../../config/bot.config.js';
import logger from '../utils/logger.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Nombres de días en español ──
const DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const DAY_NAMES_ES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

// ── Cargar skills desde archivos Markdown ──
const SKILLS_DIR = join(__dirname, '..', '..', 'config', 'skills');

function loadSkill(filename) {
    try {
        return readFileSync(join(SKILLS_DIR, filename), 'utf-8');
    } catch (error) {
        logger.error(`No se pudo cargar el skill "${filename}":`, error.message);
        return '';
    }
}

const openSkill = loadSkill('open.md');
const closedSkill = loadSkill('closed.md');

/**
 * Determina si el negocio está abierto y devuelve la instrucción apropiada.
 *
 * @returns {{ instruction: string, type: 'OPEN' | 'CLOSED' }}
 */
export function getBusinessContext() {
    const colombiaTime = new Date().toLocaleString("en-US", {
        timeZone: config.timezone,
    });
    const now = new Date(colombiaTime);

    const dayIndex = now.getDay(); // 0=Dom, 1=Lun, ..., 6=Sab
    const currentTime = now.getHours() + (now.getMinutes() / 60);
    const dayKey = DAY_NAMES[dayIndex];

    // Formatear hoy como YYYY-MM-DD
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${date}`;

    // Validar si es día festivo
    const isHoliday = config.holidays && config.holidays.includes(todayStr);
    const schedule = isHoliday ? null : config.schedule[dayKey];

    let isOpen = false;

    if (schedule) {
        const [openHour, closeHour] = schedule;
        isOpen = currentTime >= openHour && currentTime < closeHour;
    }

    let instruction = isOpen ? openSkill : closedSkill;

    if (!isOpen) {
        // Calcular próxima apertura
        const nextOpening = findNextOpening(dayIndex, currentTime, now);
        instruction = instruction.replace(/\[PROXIMO_DIA\]/g, nextOpening.dia);
        instruction = instruction.replace(/\[PROXIMA_HORA\]/g, nextOpening.hora);
    }

    // Reemplazar todos los placeholders configurables
    if (config.placeholders) {
        for (const [key, value] of Object.entries(config.placeholders)) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            instruction = instruction.replace(regex, value);
        }
    }

    return { instruction, type: isOpen ? 'OPEN' : 'CLOSED' };
}

/**
 * Busca el próximo día y hora de apertura.
 *
 * @param {number} currentDayIndex - Día actual (0-6)
 * @param {number} currentTime     - Hora actual en decimal
 * @param {Date} now               - Fecha y hora actual en la zona horaria del negocio
 * @returns {{ dia: string, hora: string }}
 */
function findNextOpening(currentDayIndex, currentTime, now) {
    // Primero: ¿abre más tarde HOY? (Solo si hoy no es feriado)
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${date}`;
    const todayIsHoliday = config.holidays && config.holidays.includes(todayStr);

    if (!todayIsHoliday) {
        const todayKey = DAY_NAMES[currentDayIndex];
        const todaySchedule = config.schedule[todayKey];
        if (todaySchedule) {
            const [openHour] = todaySchedule;
            if (currentTime < openHour) {
                return {
                    dia: 'hoy',
                    hora: formatHour(openHour),
                };
            }
        }
    }

    // Buscar en los próximos 7 días
    for (let offset = 1; offset <= 7; offset++) {
        const nextDay = new Date(now.getTime() + offset * 24 * 60 * 60 * 1000);
        const nextYear = nextDay.getFullYear();
        const nextMonth = String(nextDay.getMonth() + 1).padStart(2, '0');
        const nextDate = String(nextDay.getDate()).padStart(2, '0');
        const nextDayStr = `${nextYear}-${nextMonth}-${nextDate}`;

        if (config.holidays && config.holidays.includes(nextDayStr)) {
            // Es feriado, saltar este día
            continue;
        }

        const nextDayIndex = nextDay.getDay();
        const nextDayKey = DAY_NAMES[nextDayIndex];
        const nextSchedule = config.schedule[nextDayKey];

        if (nextSchedule) {
            const [openHour] = nextSchedule;
            const dayLabel = offset === 1
                ? `mañana ${DAY_NAMES_ES[nextDayIndex]}`
                : `el ${DAY_NAMES_ES[nextDayIndex]}`;
            return {
                dia: dayLabel,
                hora: formatHour(openHour),
            };
        }
    }

    return { dia: 'próximamente', hora: '' };
}

/**
 * Formatea una hora decimal a formato legible.
 * Ej: 18 → "6:00 p.m.", 19.5 → "7:30 p.m."
 */
function formatHour(decimalHour) {
    const hours24 = Math.floor(decimalHour);
    const minutes = Math.round((decimalHour - hours24) * 60);
    const hours12 = hours24 > 12 ? hours24 - 12 : hours24;
    const period = hours24 >= 12 ? 'p.m.' : 'a.m.';
    const minuteStr = minutes.toString().padStart(2, '0');
    return `${hours12}:${minuteStr} ${period}`;
}