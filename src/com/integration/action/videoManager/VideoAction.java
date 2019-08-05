package com.integration.action.videoManager;


import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.integration.entity.Record;
import com.integration.entity.SysUser;
import com.integration.entity.Video;
import com.integration.entity.VideoInfo;
import com.integration.service.UserService;
import com.integration.service.VideoService;
import com.integration.util.RedisUtil;
import com.integration.util.VideoUtil;

import net.sf.json.JSONObject;
//视频直播
@Controller
@RequestMapping("video/")
public class VideoAction {
        @Value("${nginxrtmp}")
        private String nginxrtmp;
        @Value("${nginxserver}")
        private String nginxserver;
	@Autowired
	VideoService vs;
	@Autowired
	UserService userService;
	//直播查询
	@RequestMapping(value = "queryVideo",method = RequestMethod.GET)
	@ResponseBody
	public Object queryVideo(@RequestParam(defaultValue="")String name,@RequestParam(defaultValue="")String code){	
	        Map<String, Object> result = new HashMap<>();
                List<Video> videos = vs.queryVideo(name, code);
                Map<String, VideoInfo> videomap = VideoUtil.getRtmps(nginxserver+"/stat");
                Set<String> names = videomap.keySet();
                for(Video video :videos) {
                    if(names.contains(video.getCode())) {
                        VideoInfo vi = videomap.get(video.getCode());
                        video.setTime(vi.getTime().replace("H","时").replace("M", "分").replace("S", "秒"));
                        video.setBytesin(vi.getBytesin());
                        video.setBwin(vi.getBwin());
                    }
                    video.setAddress(nginxrtmp+"/hls3/"+video.getCode()+"?sign="+video.getSign());
                }                
                result.put("count", videos.size());
                result.put("data", videos);
                result.put("code", 0);
                return result;
	}
        //直播添加
        @RequestMapping(value = "addVideo",method = RequestMethod.POST)
        @ResponseBody
        public Object addVideo(Video video){       
            Map<String, Object> result = new HashMap<>();
            Integer code = vs.addVideo(video);
            result.put("code", code);
            return result;
        }
        //直播编辑
        @RequestMapping(value = "editVideo",method = RequestMethod.POST)
        @ResponseBody
        public Object editVideo(Video video){       
            Map<String, Object> result = new HashMap<>();
            Integer code = vs.editVideo(video);
            result.put("code", code);
            return result;
        }
        //直播删除	
        @RequestMapping(value = "deleteVideo",method = RequestMethod.POST)
        @ResponseBody
        public Object deleteVideo(String ids) throws MalformedURLException{ 
                Map<String, Object> result = new HashMap<>();
                String [] idlist = ids.split(",");
                Integer count= vs.deleteVideo(idlist);
                result.put("code", count);
                return result;
        }
        //sse实时刷新      
        @RequestMapping(value = "sse", produces = "text/event-stream")
        @ResponseBody
        public String sse(){ 
            Map<String, VideoInfo> videomap = VideoUtil.getRtmps(nginxserver+"/stat");
            String data=JSONObject.fromObject(videomap).toString();
            return "data:"+data + "\nretry:1000\n\n";
        }  
        @RequestMapping(value = "move",method = RequestMethod.GET)
        @ResponseBody
        public void move(HttpServletRequest request){
            String lon = request.getParameter("lon");
            String lat = request.getParameter("lat");
            String alt = request.getParameter("alt");
            String code = request.getParameter("code");
            String angle = request.getParameter("angle");
            String message=lon+","+lat+","+alt+","+angle;
            WebsocketServer.sendMessageTo(message,code);
        }
        @RequestMapping(value = "queryTrailByCode",method = RequestMethod.POST)
        @ResponseBody        
        public Object  queryTrailByCode(String code){
            Map<String, Object> result = new HashMap<>();
            String trailStr = RedisUtil.getPositsByCode(code);
            result.put("code", "0");
            result.put("data", trailStr);
            return result;
        } 
        //直播授权方法,授权的人才能观看
        @RequestMapping(value = "toAllow",method = RequestMethod.POST)
        @ResponseBody        
        public Object  toAllow(Video video){
            Map<String, Object> result = new HashMap<>();
            Integer count = vs.editVideo(video);
            result.put("count", count);
            return result;
        } 
        //查询管理员列表
        @RequestMapping(value = "querySysusers",method = RequestMethod.GET)
        @ResponseBody
        public Object queryPersons(Integer page,Integer limit,@RequestParam(defaultValue="")String name,@RequestParam(defaultValue="")String mobile,@RequestParam(defaultValue="")String department){       
                Map<String, Object> result = new HashMap<>();
                PageHelper.startPage(page, limit);
                List<SysUser> results = userService.findUserByMobileAndName(mobile+"%", name+"%",department+"%");
                PageInfo<SysUser> info = new PageInfo<>(results,limit);
                result.put("count", info.getTotal());
                result.put("data", results);
                result.put("code", 0);
                return result;
        }
        @RequestMapping(value = "queryMobiles",method = RequestMethod.POST)
        @ResponseBody
        public Object queryPersons(@RequestParam(defaultValue="")String name,@RequestParam(defaultValue="")String mobile,@RequestParam(defaultValue="")String department){       
                Map<String, Object> result = new HashMap<>();
                List<SysUser> results = userService.findUserByMobileAndName(mobile+"%", name+"%",department+"%");
                List<String> persons = new ArrayList<>();
                for (SysUser user:results) {
                    persons.add(user.getMobile());
                }
                result.put("persons",persons);
                return result;
        }        
        //根据id获取授权人
        @RequestMapping(value = "queryVideoById",method = RequestMethod.POST)
        @ResponseBody        
        public Object  queryMobilesById(String id){
            Map<String, Object> result = new HashMap<>();
            String mobiles = vs.queryMobilesById(id);
            result.put("mobiles", mobiles);
            return result;
        }         
}
