export function createId(obj) {

	/* 	creates a term id from all of the variables in the 
			term
	*/
	let arr = [], objSize = 0;

	// data type validation 
	if(typeof obj !== 'object') throw new Error('createId must take a plain object');
	
	// delete id to not obstruct with creation of new id 
	delete obj.id

	// get object size 
	for (let key in obj) {
		objSize++;
	}

	// remove 1^1 from id 
	if(obj['1'] && objSize > 2) delete obj['1'];
	else if(obj['1']) obj['1'] = 1;

	for (let key in obj) {
		if(key !== 'coefficient') arr.push(`${key}^${obj[key]}`);
	}
	return arr.sort().join('');
}

export function createDefaultValues(obj) {

	/* 	if the exponent or coeeficient is not explicitly 
			entered this function will default it to 1
	*/
	let copy = {...obj},
		toSize = 0;

	for (let key in copy) {
		if (copy[key] === null) copy[key] = 1;
		toSize++;
	}
	if (toSize < 2) copy['1'] = 1;
	return copy;
}

export function getPowerVariableAndCoeefficient(term) {

	/* 	takes in a string and return a termObj which will be
			added to Polynomial.polyObj. termObj will contain a 
			coeeficient key and all variables in the term
	*/
	let termObj = {};
	termObj.coefficient = null;
	term = term.replace(/([A-Za-z])([A-Za-z])/g, '$1,$2');
	term = term.replace(/([0-9])([A-Za-z])/g, '$1,$2');

	// split term into arrays 12xy^2 => [12,x,y^2]
	let termArr = term.split(',').forEach(el => {

		// if element is number set coefficient
		if(Number(el)) termObj.coefficient = Number(el);

		// else and element has exponent set exponent
		else if(Number(el.split('^')[1])) termObj[el.split('^')[0]] = Number(el.split('^')[1]);

		// else set default exponent
		else termObj[el.split('^')[0]] = 1;
	})

	// handle other edge cases such as no variable Ex: '5'
	termObj = createDefaultValues(termObj);
	return termObj
}

export function splitTerm(term) {
	if (!term || term === '0') return undefined;
	let termObj = getPowerVariableAndCoeefficient(term)
	termObj.id = createId(termObj);
	return termObj;
}

export function stringToTable(poly) {

	/* 	turns a polynomal string into a hashtable where the 
			terms are stored in key-value pairs. The key the complex 
			variable of the term, and the value contains data about 
			that term (exponents and coefficient).  I decided to use 
			a hashtable because it has faster access than storing 
			the data in an array.

			Ex: 
			'5x^2 + 6y^2 - 7x^-5 + 5' =>
			{
				'x^2': { coefficient: 5, x: 2, id: 'x^2' },
				'y^2': { coefficient: 6, y: 2, id: 'y^2' },
				'x^-5': { coefficient: -7, x: -5, id: 'x^-5' },
				'1^1': { '1': 1, coefficient: 5, id: '1^1' },
			}
	*/
	let polyTable = {};
	poly.replace(' - ', ' + -').split(' + ').forEach(el => {
		let value = splitTerm(el);
		if(polyTable[value.id]) polyTable[value.id] += value;
		else polyTable[value.id] = value;
	});
	return polyTable;
}
