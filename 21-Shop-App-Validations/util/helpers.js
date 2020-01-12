/**
 * Check if value exists.
 *
 * @author Aditya Hajare <aditya43@gmail.com>
 * @since 18 September 2019
 *
 * @param value Function that returns the value
 */
global.isset = value => {
    try {
        // Check if the returned value of function is not undefined.
        return (value !== null && typeof value() !== 'undefined');
    } catch (e) {
        // If reference error, catch and return false since value doesn't exists. ;)
        return false;
    }
};
