package html;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.net.URL;
import javax.swing.text.MutableAttributeSet;
import javax.swing.text.html.HTML;
import javax.swing.text.html.HTMLEditorKit;

public class LinkGetter extends HTMLEditorKit.ParserCallback {

    private Writer out;
    static String startURL = "http://cs.lth.se/EDA095/";
    //static String startURL = "http://cs.lth.se/pierre_nugues/";
    static String baseURL;
    //static String startURL = "http://cs.lth.se/";

    public LinkGetter() {
        baseURL = startURL;
    }

    public LinkGetter(Writer out) {
        super();
        this.out = out;
    }

    @Override
    public void handleStartTag(HTML.Tag tag, MutableAttributeSet attributes, int position) {

        //System.out.println("Start: " + tag + " Position: " + position);
        if (tag == HTML.Tag.A) {
            String href = (String) attributes.getAttribute(HTML.Attribute.HREF);
            System.out.println("Extracted link: " + href);
            try {
                System.out.println("\tAbsolute link: " + new URL(new URL(baseURL), href));
            } catch (Exception e) {
            }
        }
    }

    @Override
    public void handleEndTag(HTML.Tag tag, int position) {
        //System.out.println("End: " + tag + " Position: " + position);
    }

    @Override
    public void handleSimpleTag(HTML.Tag tag, MutableAttributeSet attributes, int pos) {
        //System.out.println("Simple: " + t + " Position: " + pos);
        if (tag == HTML.Tag.BASE) {
            String href = (String) attributes.getAttribute(HTML.Attribute.HREF);
            baseURL = href;
            System.out.println("Base URL: " + href);
        }
        if (tag == HTML.Tag.IMG) {
            String href = (String) attributes.getAttribute(HTML.Attribute.SRC);
            System.out.println("Image: " + href);
        }
        if (tag == HTML.Tag.FRAME) {
            String href = (String) attributes.getAttribute(HTML.Attribute.SRC);
            System.out.println("Frame: " + href);
        }
    }

    @Override
    public void handleText(char[] text, int position) {
    }

    public static void main(String[] args) {
        ParserGetter kit = new ParserGetter();
        HTMLEditorKit.Parser parser = kit.getParser();
        HTMLEditorKit.ParserCallback callback = new LinkGetter(new OutputStreamWriter(System.out));
        try {
            URL url = new URL(startURL);
            InputStream in = new BufferedInputStream(url.openStream());
            InputStreamReader r = new InputStreamReader(in);
            parser.parse(r, callback, true);
        } catch (IOException ex) {
            ex.printStackTrace();
            System.err.println(ex);
        }
    }
}
