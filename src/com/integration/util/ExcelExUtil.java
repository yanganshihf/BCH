package com.integration.util; 
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFPrintSetup;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.integration.entity.ChangItems;
import com.integration.entity.DataMapping;
import com.integration.entity.TextItem;
import com.integration.service.DictionaryManageService;
public class ExcelExUtil {
    
  @SuppressWarnings("null")
public static Boolean ExcelWriteByinfos(DataMapping maping, String excelPath, Object entity, Class clazz,List<Object> dynamicData,Class clazz2,DictionaryManageService dicts) throws ClassNotFoundException {
		InputStream inStr = null;
		try {
			inStr = new FileInputStream(excelPath);
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} 
		XSSFWorkbook book = null;
		XSSFCellStyle fontStyle2 =null;
		try {
			book = new XSSFWorkbook(inStr);
			fontStyle2=createFont(book);// 字体样式
			inStr.close();
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		try {
			ChangItems ChItems= maping.getChItems();
			String rowCountStr=ChItems.getRowCount();
			rowCountStr=rowCountStr.isEmpty()?"0":rowCountStr;
			double rowCount = Integer.parseInt(rowCountStr);  
			double recordCount=dynamicData.size(); 
			int pageCount=(int)Math.ceil(recordCount/rowCount); 
			int index=0;
			for(int sheetIndex=0;sheetIndex<pageCount;sheetIndex++) {  
				XSSFSheet sheet = null;
				if(sheetIndex>0) {
					XSSFSheet fromsheet = book.getSheetAt(0);  
					XSSFSheet newsheet = book.createSheet(""+(sheetIndex+1));
					
					//打印设置
					XSSFPrintSetup printSetup = newsheet.getPrintSetup();
					XSSFPrintSetup printSetup2 = fromsheet.getPrintSetup();
			        //设置页边距
			        printSetup.setHeaderMargin(printSetup2.getHeaderMargin()); // 页眉
			        printSetup.setFooterMargin(printSetup2.getFooterMargin());//页脚
			        
			        //设置页宽
			        printSetup.setFitWidth(printSetup2.getFitWidth()); 
			        printSetup.setFitHeight(printSetup2.getFitHeight());
			        
			        //设置打印方向，横向就是true
			        printSetup.setLandscape(printSetup2.getLandscape());
			        //设置A4纸
			        printSetup.setPaperSize(printSetup2.getPaperSize()); 			        
			        printSetup.setHResolution(printSetup2.getHResolution());			        
			        printSetup.setVResolution(printSetup2.getVResolution());
					copyRows(book, fromsheet, newsheet, fromsheet.getFirstRowNum(), fromsheet.getLastRowNum());
					sheet=newsheet;
				}else {
					XSSFSheet fromsheet = book.getSheetAt(0);  
					book.setSheetName(0, ""+(sheetIndex+1)); 
				} 
			}
			for(int sheetIndex=0;sheetIndex<pageCount;sheetIndex++) { 
				XSSFSheet sheet= book.getSheetAt(sheetIndex);   
			XSSFRow row = null;
			XSSFCell cell = null;
			
			List<TextItem> flitems=	maping.getFlItems().getItems();
			if(flitems!=null && flitems.size()>0) {
			//在固定的单元格内填值
			   for (TextItem item : maping.getFlItems().getItems()) {
				try {
					int column = ExcelColumnNameToIndex(item.getColumn());
					int rownum = Integer.parseInt(item.getRow()) - 1;
					Object value = null;
					row = sheet.getRow(rownum);
					if (row != null) {
						cell = row.getCell(column);
						if (cell == null)
							continue;
						String fileName = item.getFieldName();
						Field[] fields = clazz.getDeclaredFields();
						for (Field f : fields) {
							f.setAccessible(true); 
							if (f.getName().equals(fileName)) {
								value = f.get(entity);  
								if(value!=null) {
									if("YHSW_MC".equals(fileName)) { 
										for (Field f1 : fields) {
											f1.setAccessible(true);
											if (f1.getName().equals("YHSW_LB")) { 
												Object YHSW_LB_Value=f1.get(entity);
												if(YHSW_LB_Value!=null)
												   value=dicts.GetValueByFieldCode(fileName, value.toString(), YHSW_LB_Value.toString());
											}
										}
										
									}else {
										if (value instanceof Date) {
					                         SimpleDateFormat formatter = new SimpleDateFormat("yyyy年MM月dd日");
					                         value = formatter.format((Date) value);
					                     } 
										else {
											value=dicts.GetValueByFieldCode(fileName, value.toString(), "");
										} 
								 } 
								}
								break;
							}
						} 
						cell.setCellValue(value.toString()); 
					}
				} catch (Exception e) {
					// TODO: handle exception
					continue;
				}
			  }
			}
			List<TextItem> staitems=maping.getStsItems().getItems();
			if(staitems!=null && staitems.size()>0) {
				   for (TextItem item : maping.getStsItems().getItems()) {
						try {
							int column = ExcelColumnNameToIndex(item.getColumn());
							int rownum = Integer.parseInt(item.getRow()) - 1;
							Float value = 0f;
							row = sheet.getRow(rownum);
							if (row != null) {
								cell = row.getCell(column);
								if (cell == null)
									continue;
								String fileName = item.getFieldName();
								Field[] fields = clazz2.getDeclaredFields();
								for (Field f : fields) {
									f.setAccessible(true); 
									if (f.getName().equals(fileName)) {
										int staIndex=(int)(sheetIndex*rowCount);
										int staCount=staIndex+(int)rowCount;
										for (;staIndex<staCount;staIndex++) {
											 if(staIndex<recordCount) {
										       Object data0 = dynamicData.get(staIndex);
											   Object tempValue=f.get(data0);
											   if(tempValue!=null) {
												  value += Float.parseFloat(tempValue.toString());  
											  } 
											}
										} 
										break;
									}
								} 
								cell.setCellValue(value.toString()); 
							}
						} catch (Exception e) {
							// TODO: handle exception
							continue;
						}
					  }
			} 
			
			//增加动态行的内容 
			String startRowStr=ChItems.getStartRow();
			startRowStr=startRowStr.isEmpty()?"0":startRowStr;
			int startRow = Integer.parseInt(startRowStr); 
			int pageRecordCount=(int)((sheetIndex+1)*rowCount);
			if(pageRecordCount>=recordCount) {
				pageRecordCount=(int)recordCount;
			}
			for(;index<pageRecordCount;) {
				Object data=dynamicData.get(index);
				XSSFRow row2 =sheet.getRow(index-(int)(sheetIndex*rowCount)+startRow-1);
				index++;
				/*if(index<rowCount) {
					row2 = sheet.getRow(index+startRow-1);
				}else {
					sheet.shiftRows(index+startRow-1, index+startRow, 1,true,false); 
					row2 = sheet.createRow(index+startRow-1); 
				}*/
				
				for (TextItem item :ChItems.getItems()) {
					try {				 
						int column = ExcelColumnNameToIndex(item.getColumn()); 
						Object value = null;
						if (row2 != null) {
							 cell = row2.getCell(column);
							/*if(index<=rowCount) {
							   cell = row2.getCell(column);
							}else {
								cell = row2.createCell(column);
								cell.setCellType(XSSFCell.CELL_TYPE_STRING);
								cell.setCellStyle(fontStyle2); 
								
							}*/
							if (cell == null)
								continue;
							
							   String fileName = item.getFieldName();
							   Field[] fields = clazz2.getDeclaredFields();
							   for (Field f : fields) {
								 f.setAccessible(true);
								 if (f.getName().equals(fileName)) {
									 value = f.get(data); 
									 if(value!=null) {
											if("YHSW_MC".equals(fileName)) { 
												for (Field f1 : fields) {
													f1.setAccessible(true);
													if (f1.getName().equals("YHSW_LB")) { 
														Object YHSW_LB_Value=f1.get(data);
														if(YHSW_LB_Value!=null)
														   value=dicts.GetValueByFieldCode(fileName, value.toString(), YHSW_LB_Value.toString());
													}
												}
												
											}else {
												if (value instanceof Date) {
							                         SimpleDateFormat formatter = new SimpleDateFormat("yyyy年MM月dd日");
							                         value = formatter.format((Date) value);
							                     } 
												else {
													value=dicts.GetValueByFieldCode(fileName, value.toString(), "");
												}  
											}
									 }
									 break;
								 }
							   }
							if(item.getDefaultValue()==null || item.getDefaultValue().isEmpty()) {
							   cell.setCellValue(value.toString());
							}else {
								 String defaultValue=item.getDefaultValue();
								 if(value.equals(defaultValue)) {
									 int[] code = {0x2713};
									 cell.setCellValue(new String(code, 0, 1)); 
								 }else { 
									 cell.setCellValue("");  
								 }
							}
						} 
						
					} catch (Exception e) {
						// TODO: handle exception
						continue;
					}
				}
			} 
		}
		
		} catch (Exception e) {
			return false;
			// TODO: handle exception
		}
		try {
			OutputStream out = new FileOutputStream(excelPath);
			book.write(out);
			out.close();
			return true;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return false;
	} 
  
  public static XSSFCellStyle createFont(XSSFWorkbook workbook) {
      
      // 内容
	  XSSFCellStyle fontStyle2 = workbook.createCellStyle();
      XSSFFont font2 = workbook.createFont();
      font2.setFontName("宋体");
      font2.setFontHeightInPoints((short) 10);// 设置字体大小
      fontStyle2.setFont(font2);
      fontStyle2.setBorderBottom(XSSFCellStyle.BORDER_THIN); // 下边框
      fontStyle2.setBorderLeft(XSSFCellStyle.BORDER_THIN);// 左边框
      fontStyle2.setBorderTop(XSSFCellStyle.BORDER_THIN);// 上边框
      fontStyle2.setBorderRight(XSSFCellStyle.BORDER_THIN);// 右边框
      fontStyle2.setAlignment(XSSFCellStyle.ALIGN_CENTER); // 居中
      fontStyle2.setVerticalAlignment(VerticalAlignment.CENTER); // 居中
      fontStyle2.setWrapText(true); 
      return fontStyle2;
  }
  

 public static int ExcelColumnNameToIndex(String name) throws Exception {
		int index = -1;
		name = name.toUpperCase();
		char[] nameChars = name.toCharArray();
		if (nameChars.length == 1) {
			if (nameChars[0] > 'Z' || nameChars[0] < 'A')
				throw new Exception("指定的Excel列名应为A-Z之间的字母组合！");
			index = nameChars[0] - 'A';
		} else if (nameChars.length == 2) {
			if (nameChars[0] > 'Z' || nameChars[0] < 'A' || nameChars[1] > 'Z' || nameChars[1] < 'A')
				throw new Exception("指定的Excel列名应为A-Z之间的字母组合！");
			index = (nameChars[0] - 'A' + 1) * 26 + (nameChars[1] - 'A');
		}
		return index;
	}
 
 
	/**
	 * 拷贝Excel行
	 * @param wb
	 * @param fromsheet
	 * @param newsheet
	 * @param firstrow
	 * @param lastrow
	 */
public static void copyRows(XSSFWorkbook wb, XSSFSheet fromsheet,XSSFSheet newsheet, int firstrow, int lastrow) {
		if ((firstrow == -1) || (lastrow == -1) || lastrow < firstrow) {
			return;
		}
		// 拷贝合并的单元格
		CellRangeAddress region = null;
		for (int i = 0; i < fromsheet.getNumMergedRegions(); i++) {
			region = fromsheet.getMergedRegion(i);
			if ((region.getFirstRow() >= firstrow)&& (region.getLastRow() <= lastrow)) {
				newsheet.addMergedRegion(region);
			}
		}

		XSSFRow fromRow = null;
		XSSFRow newRow = null;
		XSSFCell newCell = null;
		XSSFCell fromCell = null;
		// 设置列宽
		for (int i = firstrow; i <= lastrow; i++) {
			fromRow = fromsheet.getRow(i);
			if (fromRow != null) {
				for (int j = fromRow.getLastCellNum(); j >= fromRow.getFirstCellNum(); j--) {
					int colnum = fromsheet.getColumnWidth((short) j);
					if (colnum > 100) {
						newsheet.setColumnWidth((short) j, (short) colnum);
					}
					if (colnum == 0) {
						newsheet.setColumnHidden((short) j, true);
					} else {
						newsheet.setColumnHidden((short) j, false);
					}
				}
				break;
			}
		}
		// 拷贝行并填充数据
		for (int i = 0; i <= lastrow; i++) {
			fromRow = fromsheet.getRow(i);
			if (fromRow == null) {
				continue;
			}
			newRow = newsheet.createRow(i - firstrow);
			newRow.setHeight(fromRow.getHeight());
			for (int j = fromRow.getFirstCellNum(); j < fromRow.getPhysicalNumberOfCells(); j++) {
				fromCell = fromRow.getCell((short) j);
				if (fromCell == null) {
					continue;
				}
				newCell = newRow.createCell((short) j);
				newCell.setCellStyle(fromCell.getCellStyle());
				int cType = fromCell.getCellType();
				newCell.setCellType(cType);
				switch (cType) {
				case XSSFCell.CELL_TYPE_STRING:
					newCell.setCellValue(fromCell.getRichStringCellValue());
					break;
				case XSSFCell.CELL_TYPE_NUMERIC:
					newCell.setCellValue(fromCell.getNumericCellValue());
					break;
				case XSSFCell.CELL_TYPE_FORMULA:
					newCell.setCellFormula(fromCell.getCellFormula());
					break;
				case XSSFCell.CELL_TYPE_BOOLEAN:
					newCell.setCellValue(fromCell.getBooleanCellValue());
					break;
				case XSSFCell.CELL_TYPE_ERROR:
					newCell.setCellValue(fromCell.getErrorCellValue());
					break;
				default:
					newCell.setCellValue(fromCell.getRichStringCellValue());
					break;
				}
			}
		}
	}
}