package com.integration.util;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.integration.entity.VideoInfo;

public class VideoUtil{
    public static Map<String,VideoInfo> getRtmps(String httpUrl) {
        Map<String,VideoInfo> videos = new HashMap<>();
        try {
            URL url = new URL(httpUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.connect();
            int responseCode = connection.getResponseCode();
            if(responseCode == HttpURLConnection.HTTP_OK){
                InputStream inputStream = connection.getInputStream();
                videos = getRtmpList(inputStream);
            }
            connection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return videos;   
    }
    @SuppressWarnings("unchecked")
    private static Map<String,VideoInfo> getRtmpList(InputStream inputStream) throws DocumentException{
        Map<String,VideoInfo> videoinfos = new HashMap<>();
        SAXReader reader = new SAXReader();
        Document doc = reader.read(inputStream);
        Element root = doc.getRootElement() ;
        Element server = root.element("server");
        List<Element> applications = server.elements("application");
        for(Element application:applications) {
            String appName = application.element("name").getText();
            if("hls3".equals(appName)) {
                Element live =application.element("live");
                List<Element> streams = live.elements();
                for(Element stream:streams) {
                    if("stream".equals(stream.getName())) {
                        String name = stream.element("name").getText();
                        Integer time = Integer.parseInt(stream.element("time").getText());
                        Double bw_in = Double.parseDouble(stream.element("bw_in").getText());
                        Double bytes_in = Double.parseDouble(stream.element("bytes_in").getText());
                        VideoInfo vi = new VideoInfo();
                        vi.setName(name);
                        Integer hour = time/(1000*3600);
                        Integer min = (time%(1000*3600))/(1000*60);
                        Integer second = (time%(1000*60))/1000;
                        String timeStr = "";
                        if(hour<10) {
                            timeStr+="0"+hour+":";  
                        }else {
                            timeStr+=hour+":"; 
                        }
                        if(min<10) {
                            timeStr+="0"+min+":";
                        }else {
                            timeStr+=min+":";
                        }
                        if(second<10) {
                            timeStr+="0"+second;
                        }else {
                            timeStr+=second;
                        }
                        vi.setTime(timeStr);
                        vi.setBytesin( String.format("%.2f",bytes_in/(1024*1024))+"M");
                        vi.setBwin(String.format("%.0f",bw_in/(1024*8))+"kbps");
                        videoinfos.put(name, vi);
                    }
                } 
            }
        }

        return videoinfos;
    }
}
