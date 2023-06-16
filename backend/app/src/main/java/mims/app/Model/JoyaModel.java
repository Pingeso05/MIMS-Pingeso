package mims.app.Model;

public class JoyaModel {
    private final int id;
    private final String nombre;
    private final String tipo_joya;

    public JoyaModel(int id, String nombre, String tipo_joya){
        this.id = id;
        this.nombre = nombre;
        this.tipo_joya = tipo_joya;
    }

    public int getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getTipo_joya() {
        return tipo_joya;
    }
}
