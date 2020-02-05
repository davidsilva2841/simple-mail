import simpleMail from "./simpleMail";

export const getLabelFilters = () => {
	return simpleMail.get('/testing/gmail/labels-filters0');
	// return simpleMail.get('/gmail/labels-filters');
};

export const getEmails = () => {
	return simpleMail.get('/testing/gmail/email0');
	// return simpleMail.get('/gmail/email');
};


