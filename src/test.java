import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

public class test {
    public static float lon =108;
    public static float lat =34;
    public static int alt =100;
    public static int angle=0;
    public static void main(String[] args) {
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            public void run() {
                try {
                    Date d = new Date();
                    int sec =d.getSeconds();
                    lon+=0.0001;
                    lat+=0.0001;
                    alt+=10;
                    if(angle>3600) {
                        angle=0; 
                    }else {
                        angle=angle+20; 
                    }
                    URL url = new URL("http://60.205.206.180:8080/ResourceMonitor/video/move?lon="+lon+"&lat="+lat+"&alt="+alt+"&code=UAV1&angle="+angle);
                    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                    connection.setRequestMethod("GET");
                    connection.connect();
                    int responseCode = connection.getResponseCode();
                    connection.disconnect();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }, 1000,1000); 
    }
}
