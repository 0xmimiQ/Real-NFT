package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load("configs.env")
	if err != nil {
		log.Fatalln(err)
	}

	var chainChoose int8
	var chainName string
	var contractAddr string
	var tokenID string

	fmt.Printf("Choose you chain:\n1.Ethereum\n2.polygon\n3.BNB Chain\n4.Avalanche\n5.Fantom\n6.Cronos\n:")
	fmt.Scan(&chainChoose)

	switch chainChoose {
	case 1:
		chainName = "eth"
	case 2:
		chainName = "polygon"
	case 3:
		chainName = "bsc"
	case 4:
		chainName = "avalanche"
	case 5:
		chainName = "fantom"
	case 6:
		chainName = "cronos"
	default:
		fmt.Println("Not supported network!")
		return
	}

	fmt.Printf("Contract Address:")
	fmt.Scan(&contractAddr)

	fmt.Printf("Token ID:")
	fmt.Scan(&tokenID)

	url := "https://deep-index.moralis.io/api/v2/nft/" + contractAddr + "/" + tokenID + "?chain=" + chainName + "&format=decimal"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("accept", "application/json")
	req.Header.Add("X-API-Key", os.Getenv("moralisApiKey"))

	res, err := http.DefaultClient.Do(req)

	if err != nil {
		log.Fatalln(err)
	}

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	var JSON map[string]interface{}
	json.Unmarshal([]byte(body), &JSON)

	tokenStruct := jsonToMap(JSON)

	_, ok := tokenStruct["contract_type"]

	if !ok {
		log.Println("Your input is not a contract account or it does not exist.")
	}

	var METADATAJSON map[string]interface{}
	metadata := tokenStruct["metadata"][0]
	json.Unmarshal([]byte(metadata), &METADATAJSON)
	metadataMap := jsonToMap(METADATAJSON)

	imageUri := metadataMap["image"][0]

	// Change ipfs gateway fron default to Moralis gateway
	if strings.HasPrefix(imageUri, "ipfs://") {
		imageUri = strings.TrimPrefix(imageUri, "ipfs://")
		imageUri = "https://ipfs.moralis.io:2053/ipfs/" + imageUri
	}

	domain := getEnsDomain(tokenStruct["owner_of"][0])

	if domain == "" { // No ENS
		domain = tokenStruct["owner_of"][0]
	}

	fmt.Println("\n--\nContract Type: " + tokenStruct["contract_type"][0] +
		"\nCollection Symbol: " + tokenStruct["symbol"][0] +
		"\nDescription: " + metadataMap["description"][0] +
		"\n\nToken Name: " + metadataMap["name"][0] +
		"\nToken URI: " + tokenStruct["token_uri"][0] +
		"\nOwner: " + domain +
		"\nReal NFT URI: " + imageUri)
}

func getEnsDomain(account string) string {
	url := "https://deep-index.moralis.io/api/v2/resolve/" + account + "/reverse"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("accept", "application/json")
	req.Header.Add("X-API-Key", os.Getenv("moralisApiKey"))

	res, err := http.DefaultClient.Do(req)

	if err != nil {
		log.Println("Something went wrong when trying fetch user ENS domain.")
	}

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	var JSON map[string]interface{}
	json.Unmarshal([]byte(body), &JSON)

	out := jsonToMap(JSON)
	domain := out["name"][0]

	if domain == "<nil>" {
		domain = ""
	}

	return domain
}

func jsonToMap(data map[string]interface{}) map[string][]string {
	out := make(map[string][]string)

	// check all keys in data
	for key, value := range data {
		// check if key not exist in out variable, add it
		if _, ok := out[key]; !ok {
			out[key] = []string{}
		}

		if valueA, ok := value.(map[string]interface{}); ok { // if value is map
			out[key] = append(out[key], "")
			for keyB, valueB := range jsonToMap(valueA) {
				if _, ok := out[keyB]; !ok {
					out[keyB] = []string{}
				}
				out[keyB] = append(out[keyB], valueB...)
			}
		} else if valueA, ok := value.([]interface{}); ok { // if value is array
			for _, valueB := range valueA {
				if valueC, ok := valueB.(map[string]interface{}); ok {
					for keyD, valueD := range jsonToMap(valueC) {
						if _, ok := out[keyD]; !ok {
							out[keyD] = []string{}
						}
						out[keyD] = append(out[keyD], valueD...)
					}
				} else {
					out[key] = append(out[key], fmt.Sprintf("%v", valueB))
				}
			}
		} else { // if string and numbers and other ...
			out[key] = append(out[key], fmt.Sprintf("%v", value))
		}
	}
	return out
}
