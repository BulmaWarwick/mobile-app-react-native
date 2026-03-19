package helpers

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"log"
	"net/smtp"
	"strings"
)

const (
	smtpHost = "smtp.gmail.com"
	smtpPort = 587
	smtpUser = "your-email@gmail.com"
	smtpPass = "your-password"
)

func generateRandomString(length int) string {
	bytes := make([]byte, length)
	_, err := rand.Read(bytes)
	if err!= nil {
		log.Fatal(err)
	}
	return hex.EncodeToString(bytes)
}

func sendMail(to string, subject string, body string) error {
	auth := smtp.PlainAuth("", smtpUser, smtpPass, smtpHost)
	from := "your-email@gmail.com"
	msg := fmt.Sprintf("To: %s\nSubject: %s\n\n%s", to, subject, body)
	return smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{to}, []byte(msg))
}

func validateEmail(email string) bool {
	return strings.Contains(email, "@")
}

func validatePassword(password string) bool {
	return len(password) >= 8 && strings.ContainsAny(password, "1234567890!@#$%^&*()")
}