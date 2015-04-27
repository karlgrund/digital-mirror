package html;

import java.io.IOException;
import javax.swing.JEditorPane;
import javax.swing.JFrame;
import javax.swing.JScrollPane;
import javax.swing.WindowConstants;

public class LTHHomePage {

    public static void main(String[] args) {

        JFrame f = new JFrame("LTH");
        f.setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
        JEditorPane jep = new JEditorPane();
        jep.setEditable(false);
        try {
            jep.setPage("http://cs.lth.se");
        } catch (IOException ex) {
            jep.setContentType("text/html");
            jep.setText("<html>Could not load http://cs.lth.se </html>");
        }
        JScrollPane scrollPane = new JScrollPane(jep);
        f.setContentPane(scrollPane);
        f.setSize(512, 342);
        f.setVisible(true);
    }
} 
