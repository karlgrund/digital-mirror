package html;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.net.URL;
import javax.swing.text.html.HTMLEditorKit;

public class TagStripper extends HTMLEditorKit.ParserCallback {

    private Writer out;

    public TagStripper(Writer out) {
        this.out = out;
    }

    @Override
    public void handleText(char[] text, int position) {
        try {
            out.write(text);
            //System.out.println("\nPosition: " + position);
            out.flush();
        } catch (IOException ex) {
            System.err.println(ex);
        }
    }

    public static void main(String[] args) throws Exception {
        ParserGetter kit = new ParserGetter();
        HTMLEditorKit.Parser parser = kit.getParser();
        HTMLEditorKit.ParserCallback callback = new TagStripper(new OutputStreamWriter(System.out));
        try {
            URL url = new URL("http://cs.lth.se/EDA095");
            InputStream in = new BufferedInputStream(url.openStream());
            InputStreamReader r = new InputStreamReader(in);
            parser.parse(r, callback, true);
        } catch (IOException ex) {
            ex.printStackTrace();
            System.err.println(ex);
        }
    }
}
