package com.integration.action;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.integration.entity.JqgridPageResp;
import com.integration.entity.PDFFile;
import com.integration.entity.SysUser;
import com.integration.service.OperationLogService;
import com.integration.service.PDFFileService;
import com.integration.util.CommonFileUtil;
import com.integration.util.ZipUtil;

@Controller
@RequestMapping("file/")
public class FileAction {

	@Autowired
	PDFFileService ps;
	@Autowired
	OperationLogService os;
	/**
	 * 条件查询位置
	 * 
	 * @param department
	 * @param mobile
	 * @param personName
	 * @return
	 */
	@RequestMapping(value = "listfile", method = RequestMethod.POST)
	@ResponseBody
	public Object queryLog(Integer page, Integer rows, String fileName, String fileNum,Integer fileType) {
		JqgridPageResp<PDFFile> resp = new JqgridPageResp<PDFFile>();
		// 验证参数
		fileName = checkParam(fileName);
		fileNum = checkParam(fileNum);
		fileName = blur(fileName);
		fileNum = blur(fileNum);
		
		PageHelper.offsetPage((page - 1) * rows, rows);
		List<PDFFile> listEvents = ps.find_File_List(fileName, fileNum,fileType);

		// 记录数
		int records = (int) new PageInfo<>(listEvents).getTotal();
		// 总页数
		int total = 0;
		if (records % rows == 0) {
			total = records / rows;
		} else {
			total = records / rows + 1;
		}
		resp.setRecords(records);
		resp.setTotal(total);
		resp.setRows(listEvents);
		return resp;
	}
	
	/**
	 * 删除文件
	 * 
	 * @param department
	 * @param mobile
	 * @param personName
	 * @return
	 */
	@RequestMapping(value = "delFile", method = RequestMethod.POST)
	@ResponseBody
	public Object delFile(HttpServletRequest request,String id,String fileType,String fileName) {
		JqgridPageResp<PDFFile> resp = new JqgridPageResp<PDFFile>();
		ps.delFile(id,fileType);
		String path = "E:/uploadPoliceFiles/" + fileName;
		File file = new File(path);
        if(file.exists()){
            file.delete();
        }
	    Subject subject = SecurityUtils.getSubject();
	    SysUser user = (SysUser) subject.getPrincipal();
		String logUser = user.getUserName();	
		String logMobile = user.getMobile();
		String ModuleType = "上传下达";
		String OperationType = "删除";
		String OperationInfo;
		String Logid = UUID.randomUUID().toString().replaceAll("-", "");
		Date now = new Date();
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String logTime = simpleDateFormat.format(now);
		switch (fileType) {
		case "0":
			OperationInfo = logUser + " 删除了  一条政策法规";
			break;
		default:
			 OperationInfo = logUser + " 删除了  一条公示监督";
			break;
		}
		os.addInfo(Logid,ModuleType,OperationType,logUser,logMobile,logTime,OperationInfo);
		resp.setMsg("删除成功");
		return resp;
		 /* File file = new File(filePath);
          if(file.exists()){
              flag=file.delete();
          }*/
	}
	
	
	@RequestMapping(value = "newFileInsert", method = RequestMethod.POST)
	@ResponseBody
	public Object newFileInsert(String fileName,String fileCode,Integer fileType,String uploader,String uploadTime) {
		JqgridPageResp<PDFFile> resp = new JqgridPageResp<PDFFile>();
		// 生成id
		String uuid = UUID.randomUUID().toString().replaceAll("-", "");
		// 验证参数
		try {
			ps.newFileInsert(fileName,fileCode,fileType,uploader,uploadTime,uuid);
			resp.setMsg("上传成功");
		} catch (Exception e) {
			// TODO: handle exception
			resp.setMsg("上传失败,请重试");
		}
		
		return resp;
	}
	
	/*
	 * 采用spring提供的上传文件的方法
	 */
	@RequestMapping("springUpload")
	@ResponseBody
	public Object springUpload(HttpServletRequest request) throws IllegalStateException, IOException

	{	
		JqgridPageResp<PDFFile> resp = new JqgridPageResp<PDFFile>();
		// long startTime = System.currentTimeMillis();
		// 将当前上下文初始化给 CommonsMutipartResolver （多部分解析器）
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(
				request.getSession().getServletContext());
		// 检查form中是否有enctype="multipart/form-data"
		if (multipartResolver.isMultipart(request)) {
			// 将request变成多部分request
			MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
			// 获取multiRequest 中所有的文件名
			@SuppressWarnings("rawtypes")
			Iterator iter = multiRequest.getFileNames();

			while (iter.hasNext()) {
				// 一次遍历所有文件
				MultipartFile file = multiRequest.getFile(iter.next().toString());
				if (file != null) {
					String path = "E:/uploadPoliceFiles" + file.getOriginalFilename();
					// 上传
					file.transferTo(new File(path));
				}

			}

		}
		resp.setMsg("上传成功");
		/*long endTime = System.currentTimeMillis();
		System.out.println("方法三的运行时间：" + String.valueOf(endTime - startTime) + "ms");*/
		return resp;
	}

	
	/*
	 * 采用spring提供的上传文件的方法
	 */
	@RequestMapping("UploadExecl")
	@ResponseBody
	public Object UploadExecl(HttpServletRequest request) throws IllegalStateException, IOException

	{	
		JqgridPageResp<PDFFile> resp = new JqgridPageResp<PDFFile>();
		List<String>  data= new ArrayList<>();
		String message="";
	    Integer code = 0;
		// long startTime = System.currentTimeMillis();
		// 将当前上下文初始化给 CommonsMutipartResolver （多部分解析器）
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(
				request.getSession().getServletContext());
		// 检查form中是否有enctype="multipart/form-data"
		if (multipartResolver.isMultipart(request)) {
			// 将request变成多部分request
			MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
			// 获取multiRequest 中所有的文件名
			@SuppressWarnings("rawtypes")
			Iterator iter = multiRequest.getFileNames();

			
			MultipartFile file = multiRequest.getFile(iter.next().toString());
			InputStream is = file.getInputStream(); 
			HSSFWorkbook book = new HSSFWorkbook(is);
		    HSSFSheet sheet = book.getSheetAt(0);
		    HSSFRow row = null;
            Cell cell=null;
            row = sheet.getRow(0);
            if(row!=null) {
                String BH="",JZ="",X="",Y="",H="";
                cell = row.getCell(0);
                if(cell != null){                                                // 再次判断,只有cell 不为 null时,再给no赋值,否则,no="";这样就避免了空指针.
                    cell.setCellType(Cell.CELL_TYPE_STRING);
                    BH=cell.getStringCellValue();                             
                }
                cell = row.getCell(1);
                if(cell != null){
                    cell.setCellType(Cell.CELL_TYPE_STRING);
                    JZ=cell.getStringCellValue(); 
                }
                cell = row.getCell(2);
                if(cell != null){
                    cell.setCellType(Cell.CELL_TYPE_STRING);
                    X=cell.getStringCellValue(); 
                }
                cell = row.getCell(3);
                if(cell != null){
                    cell.setCellType(Cell.CELL_TYPE_STRING);
                    Y=cell.getStringCellValue(); 
                }
                cell = row.getCell(4);
                if(cell != null){
                    cell.setCellType(Cell.CELL_TYPE_STRING);
                    H=cell.getStringCellValue(); 
                }
                if(!"BH".equals(BH.trim())) {
                    message="BH字段必须在第一列!";
                    code = 1;
                }else if(!"JZ".equals(JZ.trim())){
                    message="JZ字段必须在第二列!";
                    code = 1; 
                }else if(!"X".equals(X.trim())){
                    message="X字段必须在第三列!";
                    code = 1;
                }else if(!"Y".equals(Y.trim())){
                    message="Y字段必须在第列!";
                    code = 1;
                }else if(!"H".equals(H.trim())){
                    message="H字段出错!";
                    code = 1;
                }
            }
            if(code!=1) {
            	int totalRows = sheet.getLastRowNum();
    		    for (int i = 1; i <= totalRows; i++) {
    		    	String x="",y="";
    		    	 row = sheet.getRow(i);
    		    	 cell = row.getCell(2);
    		    	 if(cell != null){
    	                  cell.setCellType(Cell.CELL_TYPE_STRING);
    	                  x=cell.getStringCellValue(); 
    	             }
    		    	 cell = row.getCell(3);
    	             if(cell != null){
    	                 cell.setCellType(Cell.CELL_TYPE_STRING);
    	                 y=row.getCell(3).getStringCellValue();
    	             }
    	             data.add(x+","+y);  
    		    }
            }
		}
		resp.setMsg(message);
		resp.setStatus(code);
		resp.setRows(data);
		/*long endTime = System.currentTimeMillis();
		System.out.println("方法三的运行时间：" + String.valueOf(endTime - startTime) + "ms");*/
		return resp;
	}
	
	
	
	/*
	 * 采用spring提供的上传文件的方法
	 */
	@RequestMapping("upload_identifyPhoto")
	@ResponseBody
	public Object upload_identifyPhoto(HttpServletRequest request,String newName) throws IllegalStateException, IOException

	{	
		JqgridPageResp<PDFFile> resp = new JqgridPageResp<PDFFile>();
		// long startTime = System.currentTimeMillis();
		// 将当前上下文初始化给 CommonsMutipartResolver （多部分解析器）
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(
				request.getSession().getServletContext());
		// 检查form中是否有enctype="multipart/form-data"
		if (multipartResolver.isMultipart(request)) {
			// 将request变成多部分request
			MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
			// 获取multiRequest 中所有的文件名
			@SuppressWarnings("rawtypes")
			Iterator iter = multiRequest.getFileNames();

			while (iter.hasNext()) {
				// 一次遍历所有文件
				MultipartFile file = multiRequest.getFile(iter.next().toString());
				if (file != null) {
					String path = "E:/IdentifyPhoto/" + newName;
					// 上传 
					file.transferTo(new File(path));
				}

			}

		}
		resp.setMsg("上传成功");
		/*long endTime = System.currentTimeMillis();
		System.out.println("方法三的运行时间：" + String.valueOf(endTime - startTime) + "ms");*/
		return resp;
	}
	
	
	/**
	 * 校验参数
	 * 
	 * @param param
	 * @return
	 */
	public String checkParam(String param) {
		// 如果参数为空 则跳过该参数
		if (param == null || param.length() <= 0 || "全部".equals(param)) {
			param = "%";
		}
		return param;
	}

	/**
	 * 模糊查询参数过滤
	 * 
	 * @param param
	 * @return
	 */
	public String blur(String param) {
		param = param + '%';

		return param;
	}
        /*
         * 采用spring提供的上传文件的方法
         */
        @RequestMapping("diejiafenxiUpload")
        @ResponseBody
        public Object diejiafenxiUpload(HttpServletRequest request) throws IllegalStateException, IOException

        {       
                Map<String, Object> resp = new HashMap<>();
                List<String>  data= new ArrayList<>();
                String message="";
                Integer code = 0;
                String type="";
                // 将当前上下文初始化给 CommonsMutipartResolver （多部分解析器）
                CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(
                                request.getSession().getServletContext());
                // 检查form中是否有enctype="multipart/form-data"
                if (multipartResolver.isMultipart(request)) {
                    // 将request变成多部分request
                    MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
                    // 获取multiRequest 中所有的文件名
                    @SuppressWarnings("rawtypes")
                    Iterator iter = multiRequest.getFileNames();
                    MultipartFile file = multiRequest.getFile(iter.next().toString());
                    //当导入文件为xls时
                    if(file.getOriginalFilename().endsWith(".xls")) {
                        type="xls";
                        InputStream is = file.getInputStream(); 
                        HSSFWorkbook book = new HSSFWorkbook(is);
                        HSSFSheet sheet = book.getSheetAt(0);
                        HSSFRow row = null;
                        Cell cell=null;
                        row = sheet.getRow(0);
                        if(row!=null) {
                            String BH="",JZ="",X="",Y="",H="";
                            cell = row.getCell(0);
                            if(cell != null){                                                // 再次判断,只有cell 不为 null时,再给no赋值,否则,no="";这样就避免了空指针.
                                cell.setCellType(Cell.CELL_TYPE_STRING);
                                BH=cell.getStringCellValue();                             
                            }
                            cell = row.getCell(1);
                            if(cell != null){
                                cell.setCellType(Cell.CELL_TYPE_STRING);
                                JZ=cell.getStringCellValue(); 
                            }
                            cell = row.getCell(2);
                            if(cell != null){
                                cell.setCellType(Cell.CELL_TYPE_STRING);
                                X=cell.getStringCellValue(); 
                            }
                            cell = row.getCell(3);
                            if(cell != null){
                                cell.setCellType(Cell.CELL_TYPE_STRING);
                                Y=cell.getStringCellValue(); 
                            }
                            cell = row.getCell(4);
                            if(cell != null){
                                cell.setCellType(Cell.CELL_TYPE_STRING);
                                H=cell.getStringCellValue(); 
                            }
                            if(!"BH".equals(BH.trim())) {
                                message="BH字段必须在第一列!";
                                code = 1;
                            }else if(!"JZ".equals(JZ.trim())){
                                message="JZ字段必须在第二列!";
                                code = 1; 
                            }else if(!"X".equals(X.trim())){
                                message="X字段必须在第三列!";
                                code = 1;
                            }else if(!"Y".equals(Y.trim())){
                                message="Y字段必须在第列!";
                                code = 1;
                            }else if(!"H".equals(H.trim())){
                                message="H字段出错!";
                                code = 1;
                            }
                        }
                        if(code!=1) {
                            int totalRows = sheet.getLastRowNum();
                                for (int i = 1; i <= totalRows; i++) {
                                    String x="",y="";
                                     row = sheet.getRow(i);
                                     cell = row.getCell(2);
                                     if(cell != null){
                                      cell.setCellType(Cell.CELL_TYPE_STRING);
                                      x=cell.getStringCellValue(); 
                                 }
                                     cell = row.getCell(3);
                                 if(cell != null){
                                     cell.setCellType(Cell.CELL_TYPE_STRING);
                                     y=row.getCell(3).getStringCellValue();
                                 }
                                 data.add(x+","+y);  
                                }
                        }
                        book.close(); 
                    }else {
                        //当导入文件为zip(shp)压缩包时
                        // uploads文件夹位置
                         try {
                            String rootPath = request.getSession().getServletContext().getRealPath("outSideShp/");
                             // 原始名称
                             String originalFileName = file.getOriginalFilename(); 
                             // 新文件
                             SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSS");
                             String res = sdf.format(new Date());
                             String shapePath=rootPath +res+originalFileName;
                             File newFile = new File(shapePath); 
                             // 判断目标文件所在目录是否存在
                             if( !newFile.getParentFile().exists()) {
                                 // 如果目标文件所在的目录不存在，则创建父目录
                                 newFile.getParentFile().mkdirs();
                             }
                             // 将内存中的数据写入磁盘
                             file.transferTo(newFile); 
                             String zipFilePath=shapePath;
                             String unzipFilePath=rootPath +"unzipshp"+ File.separator +res+originalFileName;;
                             ZipUtil.unzip(zipFilePath, unzipFilePath, false); 
                             List<File> fileds= CommonFileUtil.getFileList(unzipFilePath,"shp");
                             /*if(fileds.size()>0) {
                                 List<String> wktlist=new ArrayList<String>();
                                 if (GadlDateConverter.InitGdal()) { 
                                     type="shp";
                                     for(File file9:fileds) {
                                       data=GadlDateConverter.ShapeFileToWkt(file9.getAbsolutePath()); 
                                     }
                                 }else {
                                     message="导入失败";
                                     code=1;
                                 }
                             }*/
               
                        } catch (Exception e) {
                            message="导入失败";
                            code=1;
                        } 
                        
                    }
                }
                resp.put("msg", message);
                resp.put("status", code);
                resp.put("rows", data);
                resp.put("type", type);
                return resp;
        }
}
