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
					this.offlineToken = this.keycloak.refreshToken ?? null;

					if (this.offlineToken) {
						localStorage.setItem("offlineToken", this.offlineToken)
					}

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
				localStorage.removeItem("offlineToken");
				this.token = null;
				this.isAuthenticated = false;
				
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
						this.offlineToken = this.keycloak.refreshToken ?? null;

						if (this.offlineToken) {
							localStorage.setItem("offlineToken", this.offlineToken);
						}
					}
				} catch (error) {
					console.error("Manual token refresh failed", error);

					const storedOfflineToken = localStorage.getItem("offlineToken");
					if (storedOfflineToken) {
						try {
							const tokenResponse = await axios.post(
								`${import.meta.env.VITE_KEYCLOAK_URL}/realms/${import.meta.env.VITE_KEYCLOAK_REALM}/protocol/openid-connect/token`,
								new URLSearchParams({
									client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
									grant_type: "refresh_token",
									refresh_token: storedOfflineToken,
								}),
								{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
							);

							this.offlineToken = storedOfflineToken;
							this.token = tokenResponse.data.refresh_token;

							localStorage.setItem("offlineToken", this.offlineToken);
						} catch (error) {
							console.error("Failed to refresh token using offline token", error);
							this.logout();
						}
					} else {
						this.logout();
					}
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