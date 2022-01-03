/**
 *
 * @param value {string}
 * @return {boolean}
 */
export const isNumber = value => {
    return /^(0|[1-9]\d*)(\.\d+)?$/.test(value);
};

/**
 *
 * @param value {string|number}
 * @return {number}
 */
export const parseFloatIfNumber = value => {
    if (isNumber(value)) return parseFloat(value);
    return value;
};

/**
 *
 * @param event {Event}
 */
export const inputMaxOrMinOverride = event => {
    const { value, max, min } = event.target;
    if (max && value && parseFloatIfNumber(value) > parseFloatIfNumber(max)) event.target.value = max;
    if (min && value && parseFloatIfNumber(value) < parseFloatIfNumber(min)) event.target.value = min;
    if (parseFloat(value) === 0) event.target.value = '';
};
//
// /**
//  *
//  * @param number
//  * @returns {number}
//  */
// const countDecimals = number => {
//     if (Math.floor(number) === number) return 0;
//     return number.toString().split('.')[1].length || 0;
// };

/**
 *
 * @param number {number}
 * @param precision {number}
 * @returns {number}
 */
export const precisionRound = (number, precision = 10) => {
    const factor = 10 ** precision;
    const n = precision < 0 ? number : 0.01 / factor + number;
    return Math.round(n * factor) / factor;
};

/**
 *
 * @param ref {Object}
 * @returns {number}
 */
export const getValueOfRef = ref => {
    if (!ref || !ref.current || !ref.current.value) return 0;
    return parseFloatIfNumber(ref.current.value);
};
