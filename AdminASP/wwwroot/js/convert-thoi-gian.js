const convertDateTimeToString = (input) => {
	if (input === undefined) {
		return "undefined";
	}
	let datetime = input;
	if (typeof datetime === "string") {
		datetime = new Date(input);
	}
	let yyyy = "" + (datetime.getYear()+1900); yyyy = yyyy.padStart(4, "0");
	let MM = "" + (datetime.getMonth()+1); MM = MM.padStart(2, "0");
	let dd = "" + (datetime.getDate()); dd = dd.padStart(2, "0");
	let hh = "" + (datetime.getHours()); hh = hh.padStart(2, "0");
	let mm = "" + (datetime.getMinutes()); mm = mm.padStart(2, "0");
	let ss = "" + (datetime.getSeconds()); ss = ss.padStart(2, "0");
	return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
};

const convertStringToDateTime = (datetimeString) => {
	return new Date(datetimeString);
};