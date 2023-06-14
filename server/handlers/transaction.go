package handlers

import (
	dto "dumbflix/dto/result"
	transactionsdto "dumbflix/dto/transaction"
	"dumbflix/models"
	"dumbflix/repositories"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
)
type handlerTransaction struct {
	TransactionRepository repositories.TransactionRepository
	UserRepository repositories.UserRepository
}

func HandlerTransaction(TransactionRepository repositories.TransactionRepository, UserRepository repositories.UserRepository) *handlerTransaction {
	return &handlerTransaction{TransactionRepository, UserRepository}
}

func (h *handlerTransaction) FindTransactions(c *gin.Context) {
	transactions, err := h.TransactionRepository.FindTransactions()
	if err != nil {
		c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
		return
	}

	if len(transactions) > 0 {
		c.JSON(http.StatusOK, dto.SuccessResult{Status: http.StatusOK, Message: "Data for all transactions was successfully obtained", Data: transactions})
		return
		} else {
			c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: http.StatusBadRequest, Message: "No record found"})
		return
	}
}

func (h *handlerTransaction) GetTransaction(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	var transactions models.Transaction
	transactions, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
		return
	}

	c.JSON(http.StatusOK, dto.SuccessResult{Status: http.StatusOK, Message: "Transaction data successfully obtained", Data: transactions})
	return
}

func (h *handlerTransaction) CreateTransaction(c *gin.Context) {
	userLogin := c.MustGet("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	request := transactionsdto.TransactionRequest{
		Status: c.PostForm("status"),
		Price: c.PostForm("price"),
		UserId: int(userId),
	}
	if err := c.Bind(request); err != nil {
		c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
		return
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
		return
	}


	Startdate := time.Now()
	Duedate := time.Now().Add(time.Hour * 24 * 30)

	// // Create Unique Transaction Id ...
	// var transactionIsMatch = false
	// var transactionId int
	// for !transactionIsMatch {
	// 	transactionData, _ := h.TransactionRepository.GetTransaction(transactionId)
	// 	if transactionData.ID == 0 {
	// 		transactionIsMatch = true
	// 	}
	// }

	user, _ := h.UserRepository.GetUser(request.UserId)

	transaction := models.Transaction{
		// ID:        transactionId,
		UserId: request.UserId,
		User: ConvertResponseUser(user),
		StartDate: Startdate,
		DueDate:   Duedate,
		Price:     30000,
		Status:    request.Status,
	}

	dataTransactions, err := h.TransactionRepository.CreateTransaction(transaction)
	if err != nil {
		c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	// // dataTransactions, err := h.TransactionRepository.GetTransaction(newTransactions.ID)
	// // if err != nil {
	// // 	return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	// // }

	// // 1. Initiate Snap client
	// var s = snap.Client{}
	// s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)

	// // 2. Initiate Snap request param
	// req := &snap.Request{
	// 	TransactionDetails: midtrans.TransactionDetails{
	// 		OrderID:  strconv.Itoa(dataTransactions.ID),
	// 		GrossAmt: int64(dataTransactions.Price),
	// 	},
	// 	CreditCard: &snap.CreditCardDetails{
	// 		Secure: true,
	// 	},
	// 	CustomerDetail: &midtrans.CustomerDetails{
	// 		FName: dataTransactions.User.Fullname,
	// 		Email: dataTransactions.User.Email,
	// 	},
	// }

	// //3. Execute request create Snap transaction to Midtrans Snap API
	// snapResp, _ := s.CreateTransaction(req)

	c.JSON(http.StatusOK, dto.SuccessResult{Status: http.StatusOK, Data: dataTransactions})
	return
}

// func (h *handlerTransaction) Notification(c echo.Context) error {
// 	var notificationPayload map[string]interface{}

// 	if err := c.Bind(&notificationPayload); err != nil {
// 		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
// 	}

// 	transactionStatus := notificationPayload["transaction_status"].(string)
// 	fraudStatus := notificationPayload["fraud_status"].(string)
// 	orderId := notificationPayload["order_id"].(string)

// 	order_id, _ := strconv.Atoi(orderId)

// 	fmt.Print("payload: ", notificationPayload)

// 	transaction, _ := h.TransactionRepository.GetTransaction(order_id)
// 	if transactionStatus == "capture" {
// 		if fraudStatus == "challenge" {
// 			h.TransactionRepository.UpdateTransaction("pending", order_id)
// 		} else if fraudStatus == "accept" {
// 			SendMail("success", transaction)
// 			_, err := h.TransactionRepository.UpdateTransaction("success", order_id)
// 			if err != nil {
// 				fmt.Println(err)
// 			}
// 		}
// 	} else if transactionStatus == "settlement" {
// 		SendMail("success", transaction)
// 		_, err := h.TransactionRepository.UpdateTransaction("success", order_id)
// 		if err != nil {
// 			fmt.Println(err)
// 		}
// 	} else if transactionStatus == "deny" {
// 		h.TransactionRepository.UpdateTransaction("failed", order_id)
// 	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
// 		h.TransactionRepository.UpdateTransaction("failed", order_id)
// 	} else if transactionStatus == "pending" {
// 		h.TransactionRepository.UpdateTransaction("pending", order_id)
// 	}

// 	return c.JSON(http.StatusOK, dto.SuccessResult{Status: http.StatusOK, Data: notificationPayload})
// }

// func SendMail(status string, transaction models.Transaction) {

// 	if status != transaction.Status && (status == "success") {
// 		var CONFIG_SMTP_HOST = "smtp.gmail.com"
// 		var CONFIG_SMTP_PORT = 587
// 		var CONFIG_SENDER_NAME = "Waysbeans <waysbeans.admin@gmail.com>"
// 		var CONFIG_AUTH_EMAIL = os.Getenv("EMAIL_SYSTEM")
// 		var CONFIG_AUTH_PASSWORD = os.Getenv("PASSWORD_SYSTEM")

// 		var totalPrice = strconv.Itoa(transaction.Price)

// 		mailer := gomail.NewMessage()
// 		mailer.SetHeader("From", CONFIG_SENDER_NAME)
// 		mailer.SetHeader("To", "bahanbelajardw@gmail.com")
// 		mailer.SetHeader("Subject", "Transaction Status")
// 		mailer.SetBody("text/html", fmt.Sprintf(`<!DOCTYPE html>
//     <html lang="en">
//       <head>
//       <meta charset="UTF-8" />
//       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <title>Document</title>
//       <style>
//         h1 {
//         color: brown;
//         }
//       </style>
//       </head>
//       <body>
//       <h2>Product payment :</h2>
//       <ul style="list-style-type:none;">
//         <li>Total payment: Rp.%s</li>
//         <li>Status : <b>%s</b></li>
//       </ul>
//       </body>
//     </html>`, totalPrice, status))

// 		dialer := gomail.NewDialer(
// 			CONFIG_SMTP_HOST,
// 			CONFIG_SMTP_PORT,
// 			CONFIG_AUTH_EMAIL,
// 			CONFIG_AUTH_PASSWORD,
// 		)

// 		err := dialer.DialAndSend(mailer)
// 		if err != nil {
// 			log.Fatal(err.Error())
// 		}

// 		log.Println("Mail sent! to " + CONFIG_AUTH_EMAIL)
// 	}
// }

func ConvertResponseUser(u models.User) models.UserResponses  {
	return models.UserResponses{
		ID: u.ID,
		Fullname: u.Fullname,
		Email: u.Email,
		Phone: u.Phone,
		Gender: u.Gender,
		Address: u.Address,
		Status: u.Status,
	}
	
}