package mims.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
