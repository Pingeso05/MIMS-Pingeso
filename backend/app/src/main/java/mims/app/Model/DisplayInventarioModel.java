package mims.app.Model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.ModelAttribute;

@NoArgsConstructor
@AllArgsConstructor

public class DisplayInventarioModel {
    private int id_inventario;
    private String nombre_locacion;
    private String nombre_joya;

    public String getTipo_joya() {
        return tipo_joya;
    }

    public void setTipo_joya(String tipo_joya) {
        this.tipo_joya = tipo_joya;
    }

    private String tipo_joya;
    private int cantidad;
    private float precio;

    public int getId_inventario() {
        return id_inventario;
    }

    public void setId_inventario(int id_inventario) {
        this.id_inventario = id_inventario;
    }

    public String getNombre_locacion() {
        return nombre_locacion;
    }

    public void setNombre_locacion(String nombre_locacion) {
        this.nombre_locacion = nombre_locacion;
    }

    public String getNombre_joya() {
        return nombre_joya;
    }

    public void setNombre_joya(String nombre_joya) {
        this.nombre_joya = nombre_joya;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public float getPrecio() {
        return precio;
    }

    public void setPrecio(float precio) {
        this.precio = precio;
    }
}
