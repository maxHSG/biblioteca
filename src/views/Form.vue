<template>
<v-flex>
	<v-card class="elevation-12">
		
		<v-toolbar dark color="primary">
			<v-toolbar-title>{{value.id ? 'Editar' : 'Cadastrar'}} Livro</v-toolbar-title>		
		</v-toolbar>
		
		<v-card-text>
			<v-form>
				<v-text-field 
					:rules="rules.nome"
					v-model="value.nome" 
					label="Nome" 
					type="text"
				/>
				<v-text-field 
					label="Autor" 
					:rules="rules.autor"
					v-model="value.autor" 
					type="text"
				/>
				
				<v-text-field 
					label="Ano de publicação" 
					v-model="value.anoDePublicacao" 
					type="text"
				/>
				<v-text-field 
					@keyup.enter="$emit('save',value)"
					label="Localização" 
					v-model="value.localizacao" 
					type="text"
				/>
			</v-form>
		</v-card-text>

		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn color="primary" @click="$emit('save',value)">Salvar</v-btn>
		</v-card-actions>

	</v-card>
</v-flex>
</template>

<script>
import firebase from "./../util/firebase";
import "firebase/auth";
import "firebase/database";
export default {
	props: {
		value: {
			type: Object,
			default: () => ({
				id: "",
				nome: "",
				autor: "",
				anoDePublicacao: "",
				localizacao: ""
			})
		}
	},
	data: () => ({
		rules: {
			nome: [
				v => !!v || "O nome é obrigatório",
				v => v.length >= 3 || "O nome dever conter pelo menos 3 caracteres."
			],
			autor: [
				v => !!v || "O nome do autor é obrigatório",
				v =>
					v.length >= 3 ||
					"O nome do autor dever conter pelo menos 3 caracteres."
			]
		}
	})
};
</script>