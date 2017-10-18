/* -----------------MAIN-------------------- */
/* turns a polynomal string into polynomialtable (hashtable). see example.
 * 
 * Ex: 
 * '5x^2 + 6y^2 - 7x^-5 + 5' =>
 * {
 * 	'x^2': { coefficient: 5, x: 2, id: 'x^2' },
 * 	'y^2': { coefficient: 6, y: 2, id: 'y^2' },
 * 	'x^-5': { coefficient: -7, x: -5, id: 'x^-5' },
 * 	'1^1': { '1': 1, coefficient: 5, id: '1^1' },
 * }               														*/
export function stringToTable(poly) {
	let polynomialTable = {};

	/* converts minus to add negative */
	poly.replace(' - ', ' + -').split(' + ').forEach(el => {

		/* turns term (string) into term (object) */
		let value = termToTable(el);

		/* adds together redundant terms */
		if(polynomialTable[value.id]) {
			polynomialTable[value.id].coefficient += value.coefficient;
		}

		/* append new term object to polynomialTable */
		else polynomialTable[value.id] = value;
	});
	return polynomialTable;
}

/* -----------------HELPER-------------------- */
/* HOF - converts term (string) to term (key-value pair) */
export function termToTable(term) {
	// if (!term || term === '0') return undefined;
	let termObj = getPowerVariableAndCoeefficient(term)
	termObj.id = createId(termObj);
	return termObj;
}

/* -----------------HELPER-------------------- */
/* creates a term id from all of the variables in the term */
export function createId(obj) {

	let arr = [], objSize = 0;

	/* data type validation */
	if(typeof obj !== 'object') throw new Error('createId must take a plain object');
	
	/* delete id to not obstruct with creation of new id */
	delete obj.id

	/* get object size */
	for (let key in obj) {
		objSize++;
	}

	/* remove redundant 1^1 from id */
	if(obj['1'] && objSize > 2) delete obj['1'];
	else if(obj['1']) obj['1'] = 1;

	for (let key in obj) {
		if(key !== 'coefficient') arr.push(`${key}^${obj[key]}`);
	}

	/* normalizes the variable order in the term
	 * Ex:
	 * x^3y^2z^1
	 * y^2z^1x^3
	 * z^1x^3y^2
	 * should all equal x^3y^3z^1    					*/
	return arr.sort().join('');
}

/* -----------------HELPER-------------------- */
/* if the exponent or coeeficient is not explicitly 
 * entered this function will default it to 1 */
export function createDefaultValues(obj) {

	let copy = {...obj},
		toSize = 0;

	for (let key in copy) {
		if (copy[key] === null) copy[key] = 1;
		toSize++;
	}
	if (toSize < 2) copy['1'] = 1;
	return copy;
}

/* -----------------HELPER-------------------- */
/* HOF - takes in a string and return a termObj which will be
 * added to Polynomial.polynomialTable. termObj will contain a 
 * coeeficient key and all variables in the term 							*/
export function getPowerVariableAndCoeefficient(term) {

	let termObj = {};
	termObj.coefficient = null;
	term = term.replace(/([A-Za-z])([A-Za-z])/g, '$1,$2');
	term = term.replace(/([0-9])([A-Za-z])/g, '$1,$2');

	/* split term into arrays 12xy^2 => [12,x,y^2] */
	let termArr = term.split(',').forEach(el => {

		/* if element is number set coefficient */
		if(Number(el)) termObj.coefficient = Number(el);

		/* else and element has exponent set exponent */
		else if(Number(el.split('^')[1])) termObj[el.split('^')[0]] = Number(el.split('^')[1]);

		/* else set default exponent */
		else termObj[el.split('^')[0]] = 1;
	})

	/* handle other edge cases such as no variable Ex: '5' */
	termObj = createDefaultValues(termObj);
	return termObj
}


