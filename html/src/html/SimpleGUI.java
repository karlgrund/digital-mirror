package html;

import javax.swing.JFrame;
import javax.swing.JLabel;

/**
 *
 * @author pierre
 */
public class SimpleGUI {

    public static void main(String[] args) {
        JFrame frame = new JFrame();
        JLabel label = new JLabel("<html><p>Hello! This is a multiline label with <b>bold</b> and <i>italic</i> text<hr></p></html>");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.getContentPane().add(label);
        frame.setSize(300, 300);
        frame.setVisible(true);
    }
}
