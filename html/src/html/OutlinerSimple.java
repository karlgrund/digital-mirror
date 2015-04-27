package html;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Writer;
import java.net.URL;
import javax.swing.text.MutableAttributeSet;
import javax.swing.text.html.HTML;
import javax.swing.text.html.HTMLEditorKit;

public class OutlinerSimple extends HTMLEditorKit.ParserCallback {

    private Writer out;
    private boolean inHeader = false;
    private int level = 0;

    public OutlinerSimple() {
    }

    public OutlinerSimple(Writer out) {
        this.out = out;
    }

    @Override
    public void handleStartTag(HTML.Tag tag, MutableAttributeSet attributes, int position) {
        //System.out.println("Start: " + tag + " Position: " + position);
        if (tag == HTML.Tag.H1 || tag == HTML.Tag.H2 || tag == HTML.Tag.H3 || tag == HTML.Tag.H4) {
            inHeader = true;
            if (tag == HTML.Tag.H1) {
                level = 1;
            }
            if (tag == HTML.Tag.H2) {
                level = 2;
            }
            if (tag == HTML.Tag.H3) {
                level = 3;
            }
            if (tag == HTML.Tag.H4) {
                level = 4;
            }
        }
    }

    @Override
    public void handleEndTag(HTML.Tag tag, int position) {
        //System.out.println("End: " + tag + " Position: " + position);
        if (tag == HTML.Tag.H1 || tag == HTML.Tag.H2 || tag == HTML.Tag.H3 || tag == HTML.Tag.H4) {
            inHeader = false;
            level = 0;
        }
    }

    @Override
    public void handleSimpleTag(HTML.Tag t, MutableAttributeSet a, int pos) {
        //System.out.println("Simple: " + t + " Position: " + pos);
    }

    @Override
    public void handleText(char[] text, int position) {
        if (inHeader == true) {
            if (level == 2) {
                System.out.print("\t");
            }
            if (level == 3) {
                System.out.print("\t\t");
            }
            if (level == 4) {
                System.out.print("\t\t\t");
            }
            System.out.println(text);
        }
    }

    public static void main(String[] args) {
        ParserGetter kit = new ParserGetter();
        HTMLEditorKit.Parser parser = kit.getParser();
        HTMLEditorKit.ParserCallback callback = new OutlinerSimple();

        try {
            URL url = new URL("http://cs.lth.se/kurs/eda095/foerelaesningar/");
            InputStream in = new BufferedInputStream(url.openStream());
            InputStreamReader r = new InputStreamReader(in, "UTF-8");
            parser.parse(r, callback, true);
        } catch (IOException ex) {
            ex.printStackTrace();
            System.err.println(ex);
        }
    }
}
