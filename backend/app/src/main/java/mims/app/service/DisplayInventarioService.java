package mims.app.service;

import mims.app.Model.DisplayInventarioModel;
import mims.app.entity.InventarioEntity;
import mims.app.entity.JoyaEntity;
import mims.app.entity.LocacionEntity;
import mims.app.entity.TipoJoyaEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.ArrayList;

@Service
public class DisplayInventarioService {

    @Autowired
    private InventarioService inventarioService;

    @Autowired
    private JoyaService joyaService;

    @Autowired
    private TipoJoyaService tipoJoyaService;

    @Autowired
    private LocacionService locacionService;

}
