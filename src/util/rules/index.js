export const email = [
	v => !!v || "O E-mail é obrigatório",
	v => /.+@.+/.test(v) || "O E-mail deve ser válido"
];

export const name = (label, minLimit = 0) => [
	v => !!v || `O ${label} é obrigatório`,
	v => v.length <= 10 || "O nome deve ter pelo menos 10 caracteres."
];
