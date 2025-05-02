import Keycloak from "keycloak-js";
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
	state: () => ({
    	keycloak: null as Keycloak | null,
    	isAuthenticated: false,
    	token: null as string | null,
		offlineToken: null as string | null
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
					redirectUri: import.meta.env.VITE_REDIRECT_URI + "/home?login=true",
					scope: "openid offline_access"
        		});

        		if (authenticated) {
            		this.token = this.keycloak.token ?? null;

					setInterval(async () => {
						this.refreshToken();
					}, 60000);
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
					redirectUri: import.meta.env.VITE_REDIRECT_URI + "/home?login=true",
					scope: "openid offline_access",
				});
			}
		},

		logout() {
			if (this.keycloak) {
				localStorage.clear();
				
				this.keycloak.logout({
					redirectUri: import.meta.env.VITE_REDIRECT_URI + "/login"
				});
			}
		},

		async refreshToken() {
			if (this.keycloak) {
				try {
					const refreshed = await this.keycloak.updateToken(30);
					if (refreshed) {
						this.token = this.keycloak.token ?? null;
					}
				} catch (error) {
					console.error("Manual token refresh failed", error);
					this.logout();
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
		getOfflineToken: (state) => state.offlineToken,
  	}
});