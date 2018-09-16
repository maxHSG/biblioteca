<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md5>
            <v-card class="elevation-12">
              
			  <v-toolbar dark color="primary">
                <v-toolbar-title>Criando Usuário</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>

              <v-card-text>
                <v-form>
					<v-text-field 
				  		prepend-icon="person" 
						v-model="name"
						label="Nome" 
						:rules="nameRules"
						type="text"
					></v-text-field>
                  <v-text-field 
				  		prepend-icon="email" 
						v-model="email"
						label="E-mail" 
						:rules="emailRules"
						type="text"
					></v-text-field>

                  <v-text-field 
					  prepend-icon="lock" 
					  v-model="password" 
					  :rules="passwordRules"
					  label="Senha" 
					  type="password"
					></v-text-field>
                  
				  <v-text-field 
					  prepend-icon="lock" 
					  v-model="password2" 
					  :rules="passwordRules2"
					  label="Senha Novamente" 
					  type="password"
					></v-text-field>
					
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click.prevent="submit" color="primary">Salvar</v-btn>
				<v-btn @click.prevent="$router.push({name:'login'})" color="primary">Voltar</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
import firebase from "./../util/firebase";
import "firebase/auth/";
import rules from "./mixins/rules";

export default {
	name: "SignUp",
	mixins: [rules],
	data: () => ({
		valid: false,
		name: "",
		email: "",
		password: "",
		password2: ""
	}),
	computed: {
		passwordRules2() {
			return [
				...this.passwordRules,
				v => !!v || "Digite novamente a senha para confirmação",
				v => v == this.password || "A senha está incorreta"
			];
		}
	},
	methods: {
		submit() {
			firebase
				.auth()
				.createUserWithEmailAndPassword(this.email, this.password)
				.then(() => this.$router.push("/"))

				.catch(function(error) {
					console.log("Error", error);
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					if (errorCode == "auth/weak-password") {
						alert("The password is too weak.");
					} else {
						alert(errorMessage);
					}
					console.log(error);
				});
		}
	}
};
</script>
