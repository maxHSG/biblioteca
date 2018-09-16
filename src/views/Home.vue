<template>
  <v-app id="inspire">
  
    <v-toolbar color="indigo" dark fixed app>
       
		<v-spacer></v-spacer>
		<v-toolbar-title>Biblioteca</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-toolbar-items class="hidden-sm-and-down">
			<v-btn @click="signOut" color="primary"  >
				<v-icon dark left>arrow_back</v-icon> Sair
			</v-btn> 
      
    	</v-toolbar-items>


    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout>
			<v-card class="">
		
				<v-toolbar dark color="primary">
					<v-toolbar-title>Buscar Livro</v-toolbar-title>		
				</v-toolbar>
				
				<v-card-text>
					<v-form>
						<v-text-field 
							v-model="busca.nome" 
							label="Nome" 
							type="text"
						/>
						<v-text-field 
							label="Autor" 
							v-model="busca.autor" 
							type="text"
						/>
						
						<v-text-field 
							label="Ano de publicação" 
							v-model="busca.anoDePublicacao" 
							type="text"
						/>
						<v-text-field 
							label="Localização" 
							v-model="busca.localizacao" 
							type="text"
						/>
					</v-form>
				</v-card-text>

			</v-card>
          
		    <v-data-table
				style="width:100%"
				:headers="headers"
				:items="livros"
				hide-actions
				class="elevation-1"
			>
				<template slot="no-data">
					Nenhum livro encontrado.					
				</template>
				<template slot="items" slot-scope="props">
					
					<td>{{ props.item.nome }}</td>
					<td>{{ props.item.autor }}</td>
					<td>{{ props.item.anoDePublicacao }}</td>
					<td>{{ props.item.localizacao }}</td>
					<td class="text-xs-center">
						<v-btn 
							color="yellow" 
							fab 
							dark 
							small 
							@click="() => {
								dialog = true;
								livro = props.item;
							}"
							><v-icon>edit</v-icon></v-btn>
						<v-btn 
							color="red" 
							fab 
							dark 
							small
							@click="() => database.collection('livros').doc(props.item.id).delete()" 
						><v-icon>delete</v-icon></v-btn>
					</td>
				</template>
			</v-data-table>

	


        </v-layout>

		
      </v-container>


	  
    </v-content>
		<v-dialog
		v-model="dialog"
		width="500"
		>
			<FormLivro 
				v-if="dialog"
				@save="save"  
				v-model="livro"
			/>
			
		</v-dialog>
		<v-btn
			@click="() => {
				dialog = true;
				livro = cloneDeep(livroDefault);
			}"
			color="blue"
			dark
			fixed
			bottom
			right
			fab
			
		>
        	<v-icon>add</v-icon>
        </v-btn>
	
	
  </v-app>
</template>

<script>
import firebase from "./../util/firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { cloneDeep, debounce, uniqBy } from "lodash";
import FormLivro from "./Form";
export default {
	components: { FormLivro },
	data: () => ({
		dialog: false,
		headers: [
			{
				text: "Nome",
				align: "left",
				sortable: false,
				value: "nome"
			},
			{ text: "Autor", value: "autor" },
			{ text: "Ano de publicação", value: "anoDePublicacao" },
			{ text: "Localização", value: "localizacao" },
			{ text: "Ações", sortable: false, align: "center" }
		],

		database: {},
		busca: {
			nome: "",
			autor: "",
			anoDePublicacao: "",
			localizacao: ""
		},
		livroDefault: {
			nome: "",
			autor: "",
			anoDePublicacao: "",
			localizacao: ""
		},
		livro: {},
		livros: []
	}),

	mounted() {
		this.database = firebase.firestore();
		const settings = { timestampsInSnapshots: true };
		this.database.settings(settings);

		this.database.collection("livros").onSnapshot(querySnapshot => {
			this.livros = [];

			querySnapshot.forEach(doc => {
				if (doc.exists) this.livros.push({ id: doc.id, ...doc.data() });
			});
		});
	},
	watch: {
		busca: {
			handler: debounce(async function({ nome, autor, anoDePublicacao }) {
				this.livros = [];

				const querySnapshot = await this.database.collection("livros").get();

				querySnapshot.forEach(doc => {
					if (doc.exists) this.livros.push({ id: doc.id, ...doc.data() });
				});

				if (nome) {
					this.livros = this.livros.filter(
						item => item.nome.indexOf(nome) !== -1
					);
				}

				if (autor) {
					this.livros = this.livros.filter(
						item => item.autor.indexOf(autor) !== -1
					);
				}

				if (anoDePublicacao) {
					this.livros = this.livros.filter(
						item => item.anoDePublicacao.indexOf(anoDePublicacao) !== -1
					);
				}
			}, 500),
			deep: true
		}
	},
	methods: {
		cloneDeep,
		save() {
			if (!this.livro.id) {
				return this.add();
			}

			return this.edit(this.livro);
		},
		add() {
			this.database.collection("livros").add(this.livro);

			this.dialog = false;
		},
		edit({ id, ...livro }) {
			this.database
				.collection("livros")
				.doc(id)
				.set(livro);

			this.livro = cloneDeep(this.livroDefault);

			this.dialog = false;
		},
		signOut() {
			firebase
				.auth()
				.signOut()
				.catch(function(error) {});
		}
	}
};
</script>
