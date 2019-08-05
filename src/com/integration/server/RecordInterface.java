package com.integration.server;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.ws.RequestWrapper;
import javax.xml.ws.ResponseWrapper;

/**
 * This class was generated by Apache CXF 2.7.11
 * 2019-01-03T15:34:03.235+08:00
 * Generated source version: 2.7.11
 * 
 */
@WebService(targetNamespace = "http://server.integration.com/", name = "RecordInterface")
@XmlSeeAlso({ObjectFactory.class})
public interface RecordInterface {

    @WebMethod
    @RequestWrapper(localName = "deleteRecord", targetNamespace = "http://server.integration.com/", className = "com.integration.server.DeleteRecord")
    @ResponseWrapper(localName = "deleteRecordResponse", targetNamespace = "http://server.integration.com/", className = "com.integration.server.DeleteRecordResponse")
    public void deleteRecord(
        @WebParam(name = "arg0", targetNamespace = "")
        java.lang.String arg0
    );
}
