
package com.integration.server;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.integration.server package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _DeleteRecord_QNAME = new QName("http://server.integration.com/", "deleteRecord");
    private final static QName _DeleteRecordResponse_QNAME = new QName("http://server.integration.com/", "deleteRecordResponse");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.integration.server
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link DeleteRecordResponse }
     * 
     */
    public DeleteRecordResponse createDeleteRecordResponse() {
        return new DeleteRecordResponse();
    }

    /**
     * Create an instance of {@link DeleteRecord }
     * 
     */
    public DeleteRecord createDeleteRecord() {
        return new DeleteRecord();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DeleteRecord }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://server.integration.com/", name = "deleteRecord")
    public JAXBElement<DeleteRecord> createDeleteRecord(DeleteRecord value) {
        return new JAXBElement<DeleteRecord>(_DeleteRecord_QNAME, DeleteRecord.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DeleteRecordResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://server.integration.com/", name = "deleteRecordResponse")
    public JAXBElement<DeleteRecordResponse> createDeleteRecordResponse(DeleteRecordResponse value) {
        return new JAXBElement<DeleteRecordResponse>(_DeleteRecordResponse_QNAME, DeleteRecordResponse.class, null, value);
    }

}
