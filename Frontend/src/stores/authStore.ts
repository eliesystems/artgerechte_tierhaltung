import Keycloak from "keycloak-js";
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
	state: () => ({
    	keycloak: null as Keycloak | null,
    	isAuthenticated: false,
    	token: null as string | null,
  	}),

  	actions: {
    	async initKeycloak() {
      		this.keycloak = new Keycloak({
   				url: import.meta.env.VITE_KEYCLOAK_URL,
				realm: import.meta.env.VITE_KEYCLOAK_REALM,
				clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
			});

      		try {
        		const authenticated = await this.keycloak.init({
          			onLoad: "check-sso",
          			checkLoginIframe: false,
					redirectUri: import.meta.env.VITE_REDIRECT_URI + "/home"
        		});
        		if (authenticated) {
            		this.token = this.keycloak.token ?? null;
					await this.saveTokenToBackend();
        		} else {
            		this.token = null;
        		}
        		this.isAuthenticated = authenticated;
      		} catch (error) {
        		console.error("Keycloak initialization failed", error);
      		}
    	},

		login() {
			if (this.keycloak) {
				this.keycloak.login({
					redirectUri: import.meta.env.VITE_REDIRECT_URI + "/home",
				});
			}
		},

		logout() {
			if (this.keycloak) {
				this.keycloak.logout();
			}
		},

		async refreshToken() {
			if (this.keycloak) {
				try {
					await this.keycloak.updateToken(30);
					this.token = this.keycloak.token ?? null;
				} catch (error) {
					console.error("Failed to refresh token", error);
				}
			}
		},

		async saveTokenToBackend() {
			if (!this.token) {
		  		console.error("No token available");
		  	return;
		}
  
		try {
			await axios.post(import.meta.env.VITE_API_BASE_URL + "/save-user", null, {
				headers: {
			  		Authorization: `Bearer ${this.token}`,
				},
		  	});
		} catch (error) {
		  	console.error("Error saving token to backend", error);
		}
	  },
  	},

  	getters: {
    	getToken: (state) => state.token,
  	}
});