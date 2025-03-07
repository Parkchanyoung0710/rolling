const BASE_URL = `https://rolling-api.vercel.app/14-8`;
// 공통 API 요청 함수
async function apiRequest(endpoint, method = "GET", body=null){
    console.log(`${BASE_URL}${endpoint}`); 
    try{
        const options = {
            method,
            headers: { "Content-Type": "application/json" },
        };
        if(body){
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        console.log('API 응답 상태:', response.status);  
        if(!response.ok){
            throw new Error(`API 요청 실패..`);
        }
        const data = await response.json();
        console.log(`${method} 요청 성공!`, data);
        return data;
    } catch (error){
        console.error(`${method} 요청 실패..`, error)
        throw error;
    }
    
}

// API 요청 함수들 
// 대상(recipients) 함수
export const postRecipients = (data) => apiRequest(`/recipients/`, "POST", data)
export const getRecipients = () => apiRequest(`/recipients/`);
export const getIdRecipients = (id) => apiRequest(`/recipients/${id}`);
export const deleteRecipients = (id) => apiRequest(`/recipients/${id}`, "DELETE" );
// 메세지(message) 함수
export const postMessage = (id, data) => apiRequest(`/recipients/${id}/message`, "POST", data)
export const getMessage =  (id) => apiRequest(`/recipients/${id}/message`);
export const deleteMessage =  (id) => apiRequest(`/message/${id}`, "DELETE" );
// 리액션(reaction) 함수
export const postReactions = (id, data) => apiRequest(`/recipients/${id}/reactions`, "POST", data)
export const getReactions =  (id) => apiRequest(`/recipients/${id}/reactions`);