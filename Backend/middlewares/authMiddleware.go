package middlewares

import (
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

var jwtKey = []byte("secret_key")

// JwtVerify middleware
func JwtVerify() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")

		if tokenString == "" {
			c.JSON(http.StatusForbidden, gin.H{"error": "No token provided"})
			c.Abort()
			return
		}

		claims := &jwt.MapClaims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusForbidden, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		c.Set("user", claims)
		c.Next()
	}
}
