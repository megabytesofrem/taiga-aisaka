export function makeSandbox() {
    // build our impenetrable pillow fort
    return {
        console: {
            log: (s) => s,
        },
        process: {
            exit: () => 'How about no?',
            env: {
                DISCORD_TOKEN: 'That aint gonna happen, but have a gold star for trying!', // bully people trying to steal my ID
            }
        },
        Function: { 
            length: Function.length,
            prototype: { toString: Function.prototype.toString }
        },
        Math: {
            E: Math.E,
            LN10: Math.LN10,
            LN2: Math.LN2,
            PI: Math.PI,
            SQRT2: Math.SQRT2,
            
            // functions
            abs: Math.abs,
            acos: Math.acos,
            asin: Math.asin,
            atan: Math.atan,
            cos: Math.cos,
            sin: Math.sin,
            exp: Math.exp,
            floor: Math.floor,
            hypot: Math.hypot,
            log: Math.log,
            log10: Math.log10,
            max: Math.max,
            min: Math.min,
            pow: Math.pow,
            random: Math.random,
            round: Math.round,
            trunc: Math.trunc
        },
        String: {
            prototype: {
                indexOf: String.prototype.indexOf,
                includes: String.prototype.includes,
                split: String.prototype.split,
                splice: String.prototype.splice,
                substring: String.prototype.substring,
                replace: String.prototype.replace,
                toUpperCase: String.prototype.toUpperCase,
                toLowerCase: String.prototype.toLowerCase,
            }
        },
    };
}