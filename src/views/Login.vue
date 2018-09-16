<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
		
			<v-alert
			    dismissible
				:value="message.show"
				:type="message.type"
			>
				{{message.text}}
			</v-alert>
			
            <v-card class="elevation-12">
		
              
				<v-toolbar dark color="primary">
					<v-toolbar-title>Login</v-toolbar-title>
					<v-spacer></v-spacer>
				</v-toolbar>
				
				<v-card-text>
                <v-form>
                  <v-text-field 
				  		prepend-icon="person" 
						v-model="email"
						:rules="emailRules"
						label="Login" 
						type="text"
					></v-text-field>

                  	<v-text-field 
				  		@keyup.enter="login"
						prepend-icon="lock" 
					  	v-model="password"
					  	:rules="passwordRules"
					  	label="Password" 
					  	type="password"
					></v-text-field>

                </v-form>
              </v-card-text>
              <v-card-actions>
				
					<v-btn @click.prevent="$router.push({name:'signup'})"  color="primary">Cadastrar</v-btn>
					<v-spacer></v-spacer>
					
					<v-btn fab dark small color="primary" @click="googleLogin">
						<v-icon dark>fab fa-google</v-icon>
					</v-btn>

					<v-btn @click.prevent="login"  color="primary">Login</v-btn>
			
		
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
import "firebase/auth";
import rules from "./mixins/rules";

export default {
	mixins: [rules],
	data: () => ({
		valid: false,
		email: "",
		password: "",
		message: {
			text: "",
			show: false,
			type: "error"
		}
	}),
	mounted() {},
	methods: {
		async googleLogin() {
			const provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().languageCode = "pt";
			firebase
				.auth()
				.signInWithPopup(provider)
				.then(({ user }) => {
					if (user !== null) this.$router.push({ name: "home" });
				})
				.catch(function({ code, message }) {
					this.$set(this.message, "show", true);
					this.$set(this.message, "type", "error");
					console.log("Teste", { code, message });
					if (code === "auth/wrong-password") {
						this.$set(this.message, "text", "A senha é inválida.");
					} else {
						this.$set(this.message, "text", "Email ou senha inválida");
					}
				});
		},
		async login() {
			try {
				const auth = firebase.auth();

				const { user } = await auth.signInWithEmailAndPassword(
					this.email,
					this.password
				);

				if (user !== null) this.$router.push({ name: "home" });
			} catch ({ code, message }) {
				this.$set(this.message, "show", true);
				this.$set(this.message, "type", "error");
				console.log("Teste", { code, message });
				if (code === "auth/wrong-password") {
					this.$set(this.message, "text", "A senha é inválida.");
				} else {
					this.$set(this.message, "text", "Email ou senha inválida");
				}
			}
		}
	}
};
</script>
