package com.integration.action.videoManager;  
  
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;  
  
@ServerEndpoint("/websocket/{username}")  
public class WebsocketServer {  
  
    private static Map<String, WebsocketServer> clients = new ConcurrentHashMap<String, WebsocketServer>();  
    private Session session;  
    private String username;  
      
    @OnOpen  
    public void onOpen(@PathParam("username") String username, Session session) throws IOException {  
        this.username = username;  
        this.session = session;  
        clients.put(username, this);  
    }  
  
    @OnClose  
    public void onClose() throws IOException {  
        clients.remove(username);  
    }  
  
    @OnMessage  
    public void onMessage(String message) throws IOException {  
/*        JSONObject jsonTo = JSONObject.fromObject(message);  
          
        if (!jsonTo.get("To").equals("All")){  
            sendMessageTo("给一个人", jsonTo.get("To").toString());  
        }else{  
            sendMessageAll("给所有人");  
        } */ 
    }  
  
    @OnError  
    public void onError(Session session, Throwable error) {
        clients.remove(username);
    }  
  
    public static void sendMessageTo(String message, String To){  
        // session.getBasicRemote().sendText(message);  
        //session.getAsyncRemote().sendText(message); 
        for (WebsocketServer item : clients.values()) {  
            if (item.username.startsWith(To+"_") ) {
                item.session.getAsyncRemote().sendText(message);  
            }
                
        }  
    }  
} 