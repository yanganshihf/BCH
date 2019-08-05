/**
 * 
 */
package com.integration.util;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.io.Serializable;
import java.io.UnsupportedEncodingException;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

/**
 * Created by zongshu 
 */
public class XmlUtils {
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public static <T extends Serializable> T deserialize(String xmlFilePath, Class clazz)
            throws FileNotFoundException, JAXBException, UnsupportedEncodingException {
        JAXBContext context = JAXBContext.newInstance(clazz);
        Unmarshaller unmarshal = context.createUnmarshaller();
        FileInputStream fis = new FileInputStream(xmlFilePath);
        InputStreamReader isr = new InputStreamReader(fis, "UTF-8");
        return (T) unmarshal.unmarshal(isr);
    }

    public static <T> void serialize(T obj, String xmlFilePath) {
        FileWriter writer = null;
        try {
            JAXBContext context = JAXBContext.newInstance(obj.getClass());
            Marshaller marshal = context.createMarshaller();
            marshal.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
            marshal.marshal(obj, System.out);
            writer = new FileWriter(xmlFilePath);
            marshal.marshal(obj, writer);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
