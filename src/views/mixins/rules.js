export default {
	data() {
		return {
			nameRules: [
				v => !!v || "O nome é obrigatório",
				v => v.length >= 10 || "O nome dever conter pelo menos 10 caracteres."
			],
			passwordRules: [
				v => !!v || "A senha é obrigatória",
				v => v.length >= 8 || "A senha deve conter pelo menos 8 caracteres."
			],
			emailRules: [
				v => !!v || "O E-mail é obrigatório.",
				v => /.+@.+/.test(v) || "O email deve ser válido."
			]
		};
	}
};
