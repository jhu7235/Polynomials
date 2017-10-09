export function createId(obj) {
	let arr = [], objSize = 0;
	delete obj.id
	if(typeof obj !== 'object') throw new Error('createId must take a plain object');
	for (let key in obj) {
		objSize++;
	}
	
	// console.log(obj, objSize, obj['1']);
	if(obj['1'] && objSize > 2) delete obj['1'];
	else if(obj['1']) obj['1'] = 1;

	for (let key in obj) {
		// objSize++;
		if(key !== 'coefficient') arr.push(`${key}^${obj[key]}`);
	}
	// console.log(obj);
	return arr.sort().join('');
}

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

export function getPowerVariableAndCoeefficient(term) {
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
	let polyTable = {};
	poly.replace(' - ', ' + -').split(' + ').forEach(el => {
		let value = splitTerm(el);
		if(polyTable[value.id]) polyTable[value.id] += value;
		else polyTable[value.id] = value;
	});
	return polyTable;
}
