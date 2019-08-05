package com.integration.util;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FileUtils;

public class CommonFileUtil { 
	
	public static void copyDir(String sourcePath, String newPath) throws IOException {
        File file = new File(sourcePath);
        String[] filePath = file.list();
        
        if (!(new File(newPath)).exists()) {
            (new File(newPath)).mkdir();
        }
        
        for (int i = 0; i < filePath.length; i++) {
            if ((new File(sourcePath + File.separator + filePath[i])).isDirectory()) {
                copyDir(sourcePath  + File.separator  + filePath[i], newPath  + File.separator + filePath[i]);
            }
            
            if (new File(sourcePath  + File.separator + filePath[i]).isFile()) {
                copyFile(sourcePath + File.separator + filePath[i], newPath + File.separator + filePath[i]);
            }
            
        }
    }
	
	public static void copyFile(String oldPath, String newPath)throws IOException {
		File oldFile = new File(oldPath);
        File file = new File(newPath);
		FileUtils.copyFile(oldFile, file,true);
	} 
	
	
	public static boolean CopyFile2(File sourceFile,File targetFile) {
		boolean result=false; 
		if (sourceFile != null) { 
			if (targetFile.exists())  
            { 
				targetFile.delete();
            }
			// 如果该路径不存在，则创建文件目录
			if (!targetFile.getParentFile().exists())
				targetFile.getParentFile().mkdirs();
			// 将文件复制到创建的文件存储路径
			try {
				FileUtils.copyFile(sourceFile, targetFile);
			} catch (IOException e) {
				System.out.println("上传失败");
				e.printStackTrace();
			}
		}
		
		return result;
	}
	
	//删除文件夹
	//param folderPath 文件夹完整绝对路径

	public static void delFolder(String folderPath) {
	     try {
	        delAllFile(folderPath); //删除完里面所有内容
	        String filePath = folderPath;
	        filePath = filePath.toString();
	        java.io.File myFilePath = new java.io.File(filePath);
	        myFilePath.delete(); //删除空文件夹
	     } catch (Exception e) {
	       e.printStackTrace(); 
	     }
	}

	//删除指定文件夹下所有文件
	//param path 文件夹完整绝对路径
   public static boolean delAllFile(String path) {
	       boolean flag = false;
	       File file = new File(path);
	       if (!file.exists()) {
	         return flag;
	       }
	       if (!file.isDirectory()) {
	         return flag;
	       }
	       String[] tempList = file.list();
	       File temp = null;
	       for (int i = 0; i < tempList.length; i++) {
	          if (path.endsWith(File.separator)) {
	             temp = new File(path + tempList[i]);
	          } else {
	              temp = new File(path + File.separator + tempList[i]);
	          }
	          if (temp.isFile()) {
	             temp.delete();
	          }
	          if (temp.isDirectory()) {
	             delAllFile(path + "/" + tempList[i]);//先删除文件夹里面的文件
	             delFolder(path + "/" + tempList[i]);//再删除空文件夹
	             flag = true;
	          }
	       }
	       return flag;
	     }
   
   
	/**
	 * 创建文件
	 * 
	 * @throws IOException
	 */
	public static boolean creatTxtFile(String path,String name) throws IOException {
		boolean flag = false;
		String filenameTemp = path + name + ".txt";
		File filename = new File(filenameTemp);
		if (!filename.exists()) {
			filename.createNewFile();
			flag = true;
		}
		return flag;
	}

	/**
	 * 写文件
	 * 
	 * @param newStr
	 *            新内容
	 * @throws IOException
	 */
	public static boolean writeTxtFile(String filenameTemp, String newStr) throws IOException {
		// 先读取原有文件内容，然后进行写入操作
		boolean flag = false;
		String filein = newStr + "\r\n";
		String temp = "";

		FileInputStream fis = null;
		InputStreamReader isr = null;
		BufferedReader br = null;

		FileOutputStream fos = null;
		PrintWriter pw = null;
		try {
			// 文件路径
			File file = new File(filenameTemp);
			// 将文件读入输入流
			fis = new FileInputStream(file);
			isr = new InputStreamReader(fis);
			br = new BufferedReader(isr);
			StringBuffer buf = new StringBuffer();

			// 保存该文件原有的内容
			/*for (int j = 1; (temp = br.readLine()) != null; j++) {
				buf = buf.append(temp);
				// System.getProperty("line.separator")
				// 行与行之间的分隔符 相当于“\n”
				buf = buf.append(System.getProperty("line.separator"));
			}*/
			
			buf.append(filein);

			fos = new FileOutputStream(file);
			pw = new PrintWriter(fos);
			pw.write(buf.toString().toCharArray());
			pw.flush();
			flag = true;
		} catch (IOException e1) {
			// TODO 自动生成 catch 块
			throw e1;
		} finally {
			if (pw != null) {
				pw.close();
			}
			if (fos != null) {
				fos.close();
			}
			if (br != null) {
				br.close();
			}
			if (isr != null) {
				isr.close();
			}
			if (fis != null) {
				fis.close();
			}
		}
		return flag;
	}

	
	public static List<File> getFileList(String strPath,String ext) {
        File dir = new File(strPath);
        File[] files = dir.listFiles(); 
        List<File> filelist = new ArrayList<File>();
        if (files != null) {
            for (int i = 0; i < files.length; i++) {
                String fileName = files[i].getName();
                if (files[i].isDirectory()) { 
                	List<File> filelist0=getFileList(files[i].getAbsolutePath(),ext); 
                	for(File file0:filelist0){
                		filelist.add(file0);
                    }
                	
                } else if (fileName.endsWith(ext)) { 
                    String strFileName = files[i].getAbsolutePath();
                    System.out.println("---" + strFileName);
                    filelist.add(files[i]);
                } else {
                    continue;
                }
            }

        }
        return filelist;
    }
	
 
}
