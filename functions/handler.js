'use strict';
const axios = require("axios")

async function autoai(param) {
  const API_KEY = param.api_key;
const params = new URLSearchParams()
params.append('grant_type', 'urn:ibm:params:oauth:grant-type:apikey')
params.append('apikey', API_KEY)


const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}
const result=await axios.post("https://iam.cloud.ibm.com/identity/token", params, config)
  
  const token=result.data.access_token
  const configs = {
    headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json;charset=UTF-8"
    }
  }
  const fields=["Age","Gender","Polyuria","Polydipsia","sudden weight loss","weakness","Polyphagia","Genital thrush","visual blurring","Itching","Irritability","delayed healing","partial paresis","muscle stiffness","Alopecia","Obesity"]
  const value=[param.age,param.gender,param.polyuria,param.polydipsia,param.sudden_weight_loss,param.weakness,param.polyphagia,param.genital_thrush,param.visual_blurring,param.itching,param.irritability,param.delayed_healing,param.partial_paresis,param.muscle_stiffness,param.alopecia,param.obesity]
  const payload={"input_data": [{fields, "values": [value]}]}
  const res=await axios.post("https://jp-tok.ml.cloud.ibm.com/ml/v4/deployments/9567b9b7-f5a6-4428-a73b-3a7065c37f4b/predictions?version=2021-04-30",payload,configs)
  return {data:res.data}
  
}

exports.autoai = autoai;
