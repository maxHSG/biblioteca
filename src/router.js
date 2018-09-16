import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import SignUp from "./views/SignUp.vue";
import firebase from "./util/firebase";
import "firebase/auth";

Vue.use(Router);

const router = new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			name: "home",
			component: Home
		},
		{
			path: "/login",
			name: "login",
			component: Login
		},
		{
			path: "/signup",
			name: "signup",
			component: SignUp
		}
	]
});

router.beforeEach((to, from, next) => {
	const auth = firebase.auth();
	auth.onAuthStateChanged(user => {
		if (user || to.name == "login" || to.name == "signup") {
			next();
		} else {
			next("/login");
		}
	});
});

export default router;
