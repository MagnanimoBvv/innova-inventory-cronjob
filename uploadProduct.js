const axios = require('axios');
require('dotenv').config();

async function getInnovaProductByCode(code) {
    const response = await axios.get(
        'https://zbobxn2ot3.execute-api.us-east-1.amazonaws.com/default/Innovation_get_Producto',
        {
            params: {
                User: process.env.INNOVA_USER,
                Clave: process.env.INNOVA_PASSWORD,
                Codigo: code,
            },
            headers: {
                'auth-token': process.env.INNOVA_AUTH_TOKEN
            },
        }
    );

    return response.data.producto.Producto[0];
}

const surfaces = {
    'PLÁSTICO': 'PLÁSTICO',
    'METAL, ALUMINIO': 'METAL',
    'METAL': 'METAL',
    'FIBRA DE TRIGO': 'PLÁSTICO',
    'POLIPROPILENO': 'PLÁSTICO',
    'CURPIEL': 'TEXTIL',
    'Acero Inoxidable': 'METAL',
    'BAMBÚ': 'MADERA',
    'NYLON': 'TEXTIL',
    'POLIURETANO': 'PLÁSTICO',
    'RPET': 'TEXTIL',
    '': 'N/A',
    'CURPIEL, PVC': 'PLÁSTICO',
    'METAL, Acero Inoxidable': 'METAL',
    'CARTON, PLÁSTICO': 'MADERA',
    'Acero Inoxidable, METAL': 'METAL',
    'ALUMINIO, METAL': 'METAL',
    'ALUMINIO': 'METAL',
    'CORCHO': 'MADERA',
    'CARTON': 'MADERA',
    'ABS': 'PLÁSTICO',
    'PIEL': 'TEXTIL',
    'TELA': 'TEXTIL',
    'POLIESTER': 'TEXTIL',
    'ETIL VINIL ACETATO': 'TEXTIL',
    'Cuero PU': 'PLÁSTICO',
    'SILICON': 'RUBBER',
    'PVC': 'PLÁSTICO',
    'FIELTRO': 'TEXTIL',
    'VIDRIO': 'VIDRIO',
    'CRISTAL': 'VIDRIO',
    'MADERA': 'MADERA',
    'CERAMICA': 'CERAMICA',
    'Algodón': 'TEXTIL',
    'Acero Inoxidable, MADERA': 'METAL',
    'MADERA, MÁRMOL': 'MADERA',
    'MÁRMOL, MADERA': 'MADERA',
    'RIPSTOP': 'TEXTIL',
    'ALEACION DE ZINC': 'METAL',
    'SEMI PIEL': 'TEXTIL',
    'TRITAN': 'PLÁSTICO',
    'SAN': 'METAL',
    'AS': 'PLÁSTICO',
    'POLICARBONATO': 'PLÁSTICO',
    'PORCELANA': 'CERAMICA',
    'POLIESTER, CURPIEL': 'TEXTIL',
    'PONGEE': 'PLÁSTICO',
    'NEOPRENO': 'TEXTIL',
    'POLIAMIDA': 'TEXTIL',
    'ELASTANO': 'TEXTIL',
    'LONETA': 'TEXTIL',
    'NON-WOVEN LAMINADO': 'TEXTIL',
    'FELPA': 'TEXTIL',
    'LONA TARPAULIN': 'TEXTIL',
    'POLIESTER, NYLON': 'TEXTIL',
    'POLIESTER, METAL': 'METAL',
    'CURPIEL, POLIESTER': 'TEXTIL',
    'Cuero PU, POLIESTER': 'TEXTIL'
};

const printingTechniques = {
    'Serigrafía': 'SERIGRAFÍA',
    'Tampografía': 'SERIGRAFÍA',
    'Grabado láser': 'GRABADO LÁSER',
    'DTF UV': 'FULL COLOR',
    'serigrafía': 'SERIGRAFÍA',
    'grabado láser (se ilumina el logo).': 'GRABADO LÁSER',
    'Goteado de Resina.': 'GOTA DE RESINA',
    'Tampografía con tinta especial para silicón.': 'SERIGRAFÍA',
    'Bordado.': 'BORDADO',
    'Impresión digital': 'FULL COLOR',
    'Embozado': 'GRABADO LÁSER',
    'Offset': 'FULL COLOR',
    'Sandblast': 'GRABADO LÁSER',
    'Sublimado': 'SUBLIMACION',
};

const categories = {
    'Cuidado Personal - Pastilleros': 'hogar,salud y cuidado personal',
    'Belleza - Espejos': 'hogar,belleza',
    'Belleza, Outlet - Accesorios de Belleza': 'hogar,belleza',
    'Belleza - Accesorios de Belleza': 'hogar,belleza',
    'Belleza, Cuidado Personal - Espejos, Pastilleros': 'hogar,belleza,salud y cuidado personal',
    'Viaje, Cuidado Personal - Pastilleros': 'hogar,salud y cuidado personal',
    'Cuidado Personal, Ecológica - Pastilleros': 'hogar,salud y cuidado personal,ecologicos',
    'Viaje, Belleza - Accesorios de Belleza': 'hogar,belleza',
    'Belleza - Espejos, Accesorios de Belleza': 'hogar,belleza',
    'Viaje - Accesorios de Viaje': 'hogar,accesorios',
    'Cuidado Personal, Viaje - Accesorios de Viaje': 'hogar,salud y cuidado personal',
    'Escritura, Ejecutiva - Bolígrafos, Tinta Negra': 'oficina,boligrafos',
    'Escritura, Outlet - Bolígrafos, Tinta Negra': 'oficina,boligrafos',
    'Escritura - Bolígrafos, Tinta Negra': 'oficina,boligrafos',
    'Ecológica, Escritura - Bolígrafos, Tinta Negra': 'ecologicos,boligrafos ecologicos,oficina,boligrafos',
    'Escritura - Bolígrafos, Marca Textos, Tinta Negra': 'oficina,boligrafos,marca textos',
    'Escritura, Llaveros - Bolígrafos': 'oficina,boligrafos,hogar,llaveros',
    'Escritura - Bolígrafos': 'oficina,boligrafos',
    'Escritura, Ecológica - Bolígrafos, Tinta Negra': 'ecologicos,boligrafos ecologicos,oficina,boligrafos',
    'Escritura, Outlet - Bolígrafos, Tinta Negra, Tinta azul': 'oficina,boligrafos',
    'Escritura, Ejecutiva - Bolígrafos': 'oficina,boligrafos',
    'Escritura - Bolígrafos, Tinta azul': 'oficina,boligrafos',
    'Escritura - Tinta azul, Bolígrafos': 'oficina,boligrafos',
    'Escritura - Tinta azul': 'oficina,boligrafos',
    'Escritura, Ecológica - Tinta Negra': 'ecologicos,boligrafos ecologicos,oficina,boligrafos',
    'Escritura, Ecológica - Bolígrafos': 'ecologicos,boligrafos ecologicos,oficina,boligrafos',
    'Escritura, Ecológica - Tinta azul': 'ecologicos,boligrafos ecologicos,oficina,boligrafos',
    'Ecológica, Escritura - Oficina, Tinta Negra, Bolígrafos': 'ecologicos,boligrafos ecologicos,oficina,boligrafos',
    'Escritura - Bolígrafos, Marca Textos': 'oficina,boligrafos,marca textos',
    'Escolares y Niños, Escritura - Marca Textos': 'oficina,escolares,marca textos',
    'Escritura, Escolares y Niños - Bolígrafos': 'oficina,escolares,boligrafos',
    'Escritura, Escolares y Niños - Tinta azul': 'oficina,escolares,boligrafos',
    'Escritura - Marca Textos': 'oficina,marca textos',
    'Escritura - ': 'oficina,boligrafos',
    'Escritura, Ejecutiva - Bolígrafos, Tinta azul': 'oficina,boligrafos',
    'Escritura, Oficina - Marca Textos': 'oficina,marca textos',
    'Oficina - ': 'oficina,accesorios de oficina',
    'Ecológica, Oficina - Oficina': 'ecologicos,oficina ecologica,oficina,accesorios de oficina',
    'Escritura, Escolares y Niños - Marca Textos': 'oficina,escolares,marca textos',
    'Escolares y Niños, Ecológica, Escritura - ': 'oficina,escolares,ecologicos,boligrafos ecologicos',
    'Oficina, Ecológica - Oficina': 'oficina,accesorios de oficina,ecologicos,oficina ecologica',
    'Oficina, Escolares y Niños, Ecológica - Oficina, Libretas': 'oficina,escolares,libretas,ecologicos,libretas ecologicas',
    'Oficina, Libretas, Ecológica - Oficina': 'oficina,libretas,ecologicos,libretas ecologicas',
    'Oficina, Ecológica - Ecológicas': 'oficina,accesorios de oficina,ecologicos,oficina ecologica',
    'Ecológica - Oficina': 'ecologicos,oficina ecologica,oficina,accesorios de oficina',
    'Escolares y Niños - Ecológicas': 'oficina,escolares,ecologicos',
    'Oficina - Oficina': 'oficina,accesorios de oficina',
    'Libretas, Oficina - ': 'oficina,libretas',
    'Libretas, Escolares y Niños - Con bolígrafo': 'oficina,escolares,libretas',
    'Escolares y Niños - Oficina': 'oficina,escolares',
    'Oficina, Ecológica, Escolares y Niños - Oficina': 'oficina,escolares,ecologicos,oficina ecologica',
    'Escolares y Niños, Escritura - ': 'oficina,escolares,boligrafos',
    'Ejecutiva - ': 'oficina,accesorios de oficina',
    'Oficina - Marca Textos': 'oficina,marca textos',
    'Oficina, Escolares y Niños - ': 'oficina,escolares',
    'Ejecutiva, Mochilas y Maletas, Outlet - Porta Laptop': 'textil,porta laptop',
    'Ejecutiva, Outlet, Libretas - ': 'oficina,libretas',
    'Tecnología - Oficina': 'tecnologia,accesorios',
    'Oficina, Outlet - ': 'oficina,accesorios de oficina',
    'Ejecutiva, Libretas, Sets - Con bolígrafo': 'oficina,libretas',
    'Ecológica, Ejecutiva, Libretas, Sets - Libretas, Con bolígrafo, Oficina': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Ejecutiva, Mochilas y Maletas - Porta Laptop': 'textil,porta laptop',
    'Ejecutiva, Oficina - ': 'oficina,accessorios de oficina',
    'Ejecutiva - Porta Laptop': 'textil,porta laptop',
    'Ejecutiva, Sets - ': 'oficina,accessorios de oficina',
    'Ejecutiva, Sets - Agendas': 'oficina,libretas',
    'Sets, Ejecutiva - Agendas': 'oficina,libretas',
    'Libretas, Ejecutiva - Con bolígrafo': 'oficina,libretas',
    'Ejecutiva, Sets, Libretas - ': 'oficina,libretas',
    'Ejecutiva, Sets, Libretas - Con bolígrafo': 'oficina,libretas',
    'Ejecutiva, Libretas - Con bolígrafo': 'oficina,libretas',
    'Ejecutiva, Viaje - Accesorios de Viaje': 'hogar,accesorios',
    'Fitness, Viaje - Accesorios de Viaje': 'fitness y tiempo libre,deportes,hogar,accesorios',
    'Herramientas, Outlet - ': 'herramientas,herramientas generales',
    'Herramientas, Llaveros - ': 'hogar,llaveros',
    'Herramientas - ': 'herramientas,herramientas generales',
    'Herramientas, Oficina - ': 'oficina,accesorios de oficina',
    'Bar, Llaveros - ': 'hogar,bar,llaveros',
    'Sets - Cocina': 'hogar,cocina',
    'Hogar, Escolares y Niños - Contenedores de alimentos': 'hogar,oficina,escolares,contenedores de alimentos',
    'Escolares y Niños, Hogar - Contenedores de alimentos': 'hogar,oficina,escolares,contenedores de alimentos',
    'Bar - ': 'hogar,bar',
    'Hogar - Jarras y Prensas Francesas': 'hogar,cocina',
    'Bar - Tablas de Queso y Sets de Vino': 'hogar,bar',
    'Bar, Sets - Tablas de Queso y Sets de Vino': 'hogar,bar',
    'Escolares y Niños, Ecológica, Hogar - Alimentos, Contenedores de alimentos': 'ecologicos,alimentos ecologicos,oficina,escolares,hogar,contenedores de alimentos',
    'Sets, Hogar, Bar - Cocina, Tablas de Queso y Sets de Vino, Tablas': 'hogar,bar',
    'Hogar, Viaje - , Cubiertos': 'hogar,cocina',
    'Escolares y Niños, Hogar - Alimentos, Cubiertos': 'hogar,oficina,escolares,contenedores de alimentos',
    'Viaje, Hogar - Cubiertos': 'hogar,cocina',
    'Viaje, Belleza, Cuidado Personal - Accesorios de Belleza, Accesorios de Viaje': 'hogar,belleza',
    'Viaje, Belleza - Accesorios de Belleza, Accesorios de Viaje': 'hogar,belleza',
    'Escolares y Niños, Hogar, Ecológica - Contenedores de alimentos, Alimentos': 'ecologicos,alimentos ecologicos,oficina,escolares,hogar,contenedores de alimentos',
    'Hogar - Cocina': 'hogar,cocina',
    'Ecológica, Hogar - Cubiertos, Alimentos': 'ecologicos,alimentos ecologicos,hogar,cocina',
    'Hogar, Ecológica, Escolares y Niños - Contenedores de alimentos': 'ecologicos,alimentos ecologicos,oficina,escolares,hogar,contenedores de alimentos',
    'Hogar, Escolares y Niños - Alimentos, Contenedores de alimentos': 'hogar,oficina,escolares,contenedores de alimentos',
    'Tecnología - ': 'tecnologia,accesorios',
    'Escolares y Niños, Ecológica - Alimentos': 'ecologicos,alimentos ecologicos,oficina,escolares',
    'Hogar, Bar, Sets - Cocina': 'hogar,bar,cocina',
    'Hogar, Bar - Tablas, Tablas de Queso y Sets de Vino': 'hogar,bar',
    'Hogar, Tecnología - ': 'tecnologia,accesorios',
    'Bar, Hogar - Tablas, Tablas de Queso y Sets de Vino': 'hogar,bar',
    'Sets, Hogar, Bar - Cocina, Tablas': 'hogar,bar,cocina',
    'Escolares y Niños - Cubiertos': 'oficina,escolares,hogar,cocina',
    'Fitness - ': 'fitness y tiempo libre,deportes',
    'Hogar - Alimentos': 'hogar,contenedores de alimentos',
    'Escolares y Niños - Contenedores de alimentos': 'oficina,escolares,hogar,contenedores de alimentos',
    'Escolares y Niños, Hogar - Cubiertos, Alimentos': 'hogar,oficina,escolares,cocina',
    'Escolares y Niños, Hogar, Ecológica - Cubiertos': 'ecologicos,alimentos ecologicos,oficina,escolares,hogar,cocina',
    'Oficina, Bebidas, Hogar - Termos, Jarras y Prensas Francesas': 'bebidas,termos,hogar,cocina',
    'Bebidas, Hogar, Tecnología - Cocina, Tazas': 'bebidas,tazas,hogar,cocina,tecnologia,gadgets',
    'Viaje, Belleza - Accesorios de Viaje, Accesorios de Belleza': 'hogar,belleza',
    'Hogar - Cubiertos': 'hogar,cocina',
    'Viaje - ': 'hogar,accesorios',
    'Hogar, Belleza - Decoración': 'hogar,belleza',
    'Hogar - Cocina, Jarras y Prensas Francesas': 'hogar,cocina',
    'Hogar, Bebidas - Cocina, Tazas': 'bebidas,tazas,hogar,cocina',
    'Bar, Hogar - Cocina': 'hogar,bar,cocina',
    'Hogar - Cocina, Tablas': 'hogar,cocina',
    'Hogar - Cocina, Contenedores de alimentos': 'hogar,cocina,contenedores de alimentos',
    'Hogar, Ecológica - Cocina, Tablas': 'ecologicos,alimentos ecologicos,hogar,cocina',
    'Ecológica - Contenedores de alimentos': 'ecologicos,alimentos ecologicos',
    'Belleza, Hogar - Decoración': 'hogar,belleza',
    'Bebidas, Hogar - Cocina, Tazas': 'bebidas,tazas,hogar,cocina',
    'Bebidas, Hogar - Tazas, Cocina': 'bebidas,tazas,hogar,cocina',
    'Hogar - Decoración': 'hogar,accesorios',
    'Hogar, Bar - Cocina, Tablas, Tablas de Queso y Sets de Vino': 'hogar,bar,cocina',
    'Belleza, Viaje - Accesorios de Viaje, Accesorios de Belleza': 'hogar,belleza',
    'Hogar - Contenedores de alimentos, Cocina': 'hogar,contenedores de alimentos,cocina',
    'Bar, Hogar - Decoración': 'hogar,bar,accesorios',
    'Hogar, Belleza - Cocina, Contenedores de alimentos': 'hogar,belleza,cocina,contenedores de alimentos',
    'Ecológica - Cubiertos': 'ecologicos,alimentos ecologicos,hogar,cocina',
    'Hogar, Campaña Verano, Viaje, Sets - Cocina': 'hogar,cocina',
    'Hogar - ': 'hogar,accesorios',
    'Hogar - Tablas': 'hogar,cocina',
    'Hogar, Campaña Verano - Contenedores de alimentos, Cocina': 'hogar,contenedores de alimentos,cocina',
    'Hogar, Bar - Tablas de Queso y Sets de Vino, Tablas': 'hogar,bar',
    'Hogar, Bar - Tablas, Tablas de Queso y Sets de Vino, Decoración': 'hogar,bar',
    'Hogar, Bar - Cocina, Decoración': 'hogar,bar,cocina',
    'Viaje, Belleza, Cuidado Personal - Accesorios de Viaje, Accesorios de Belleza': 'hogar,belleza',
    'Hogar, Bar - ': 'hogar,bar',
    'Bar, Hogar - ': 'hogar,bar',
    'Relojes - Estuches de Reloj': 'hogar,relojes de pared y escritorio',
    'Sets - Arma tu set': 'hogar,accesorios',
    'Ecológica, Libretas - Con bolígrafo, Espiral': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Libretas, Ecológica - Libretas, Con bolígrafo, Espiral': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Ecológica, Oficina, Libretas - Con bolígrafo': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Libretas, Ecológica - Ecológicas, Con bolígrafo, Espiral': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Ecológica, Libretas - Libretas, Con bolígrafo': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Libretas, Outlet - ': 'oficina,libretas',
    'Libretas - ': 'oficina,libretas',
    'Ecológica, Libretas - Libretas, Con bolígrafo, Espiral': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Libretas, Ecológica - Con bolígrafo': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Libretas - Con bolígrafo': 'oficina,libretas',
    'Ecológica, Libretas - Libretas, Espiral': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Ecológica, Libretas - Libretas, Ecológicas, Con bolígrafo': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Libretas - Libretas, Espiral': 'oficina,libretas',
    'Libretas - , Espiral': 'oficina,libretas',
    'Libretas, Ecológica - Ecológicas, Espiral, Con bolígrafo': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Libretas, Ecológica - Con bolígrafo, Libretas, Espiral': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Libretas, Ecológica - Libretas, Ecológicas, Espiral, Con bolígrafo': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Ecológica - Ecológicas': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Ecológica, Libretas - Con bolígrafo, Espiral, Ecológicas': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Ecológica - Libretas': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Libretas - Ecológicas': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Libretas, Ecológica - Con bolígrafo, Espiral, Ecológicas': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Libretas, Ecológica - Ecológicas, Libretas, Espiral': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Libretas - Espiral': 'oficina,libretas',
    'Libretas, Ecológica - Ecológicas, Espiral, Libretas': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Libretas, Ecológica - Ecológicas, Espiral': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Libretas, Ecológica - Libretas, Ecológicas, Espiral': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Libretas, Ecológica - Libretas': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Llaveros - ': 'hogar,llaveros',
    'Cuidado Personal - ': 'hogar,salud y cuidado personal',
    'Escritura, Cuidado Personal - Bolígrafos': 'oficina,boligrafos,hogar,salud y cuidado personal',
    'Hogar, Outlet - Decoración': 'hogar,accesorios',
    'Relojes - Pared y Escritorio': 'hogar,relojes de pared y escritorio',
    'Mascotas - ': 'fitness y tiempo libre,mascotas',
    'Relojes - Relojes de Pulso': 'hogar,relojes de pared y escritorio',
    'Relojes, Outlet - Relojes de Pulso': 'hogar,relojes de pared y escritorio',
    'Antiestrés - ': 'fitness y tiempo libre,antiestrés',
    'Escolares y Niños, Fitness - ': 'fitness y tiempo libre,deportes,oficina,escolares',
    'Viaje, Fitness - ': 'fitness y tiempo libre,deportes,hogar,accesorios',
    'Viaje, Campaña Verano - Accesorios de Viaje': 'hogar,accesorios',
    'Sets - ': 'hogar,accesorios',
    'Escritura, Sets - Bolígrafos': 'oficina,boligrafos,accesorios de oficina',
    'Escritura, Sets, Ecológica - Oficina': 'ecologicos,oficina ecologica,oficina,boligrafos,accesorios de oficina',
    'Sets - Bolígrafos': 'oficina,boligrafos,accesorios de oficina',
    'Sets, Oficina - Oficina': 'oficina,accesorios de oficina',
    'Sets, Libretas, Bebidas - Espiral, Vasos': 'oficina,libretas,accesorios de oficina',
    'Bebidas - Cocina': 'hogar,cocina',
    'Escritura, Sets, Ejecutiva - Oficina': 'oficina,boligrafos,accesorios de oficina',
    'Hogar, Sets - Jarras y Prensas Francesas': 'hogar,cocina',
    'Sets, Paraguas - ': 'textil,paraguas e impermeables',
    'Bebidas, Sets - Termos': 'bebidas,termos',
    'Sets - Tinta azul': 'oficina,boligrafos',
    'Bebidas - Cilindros': 'bebidas,cilindros',
    'Sets, Bolsas, Libretas - Ecológicas, Con bolígrafo': 'ecologicos,libretas ecologicas,oficina,libretas',
    'Sets, Ejecutiva - ': 'oficina,accesorios de oficina',
    'Bebidas, Outlet - Termos': 'bebidas,termos',
    'Bebidas - Termos': 'bebidas,termos',
    'Bebidas - Vasos': 'bebidas,vasos',
    'Bebidas, Outlet - Cilindros': 'bebidas,cilindros',
    'Bebidas, Outlet - Vasos': 'bebidas,vasos',
    'Bebidas, Fitness - Cilindros': 'bebidas,fitness y tiempo libre,deportes,cilindros',
    'Bebidas, Escolares y Niños - Cilindros': 'bebidas,cilindros,oficina,escolares',
    'Bebidas - Tazas': 'bebidas,tazas',
    'Bebidas, Cuidado Personal, Fitness - Cilindros, Pastilleros': 'bebidas,cilindros,hogar,salud y cuidado personal',
    'Bebidas, Campaña Verano - Vasos': 'bebidas,vasos',
    'Fitness - Cilindros': 'fitness y tiempo libre,deportes,bebidas,cilindros',
    'Bebidas, Ecológica - Bebidas': 'ecologicos,bebidas ecologicas,bebidas',
    'Bebidas, Fitness, Cuidado Personal - Cilindros, Pastilleros': 'bebidas,cilindros,hogar,salud y cuidado personal,fitness y tiempo libre,deportes',
    'Ecológica - Vasos': 'ecologicos,bebidas ecologicas,bebidas,vasos',
    'Bebidas, Ecológica - Vasos, Bebidas': 'ecologicos,bebidas ecologicas,bebidas,vasos',
    'Bebidas, Ecológica - Vasos': 'ecologicos,bebidas ecologicas,bebidas,vasos',
    'Ecológica - Bebidas': 'ecologicos,bebidas ecologicas,bebidas',
    'Viaje, Bebidas, Campaña Verano - Vasos': 'bebidas,vasos',
    'Bebidas - Bebidas': 'bebidas',
    'Bebidas, Campaña Verano - Cilindros': 'bebidas,cilindros',
    'Bebidas, Campaña Verano - Termos': 'bebidas,termos',
    'Bebidas - Línea para Sublimar': 'bebidas',
    'Bebidas, Sets - Tazas': 'bebidas,tazas',
    'Bebidas, Fitness - Termos': 'bebidas,termos,fitness y tiempo libre,deportes',
    'Bebidas, Fitness, Campaña Verano - Cilindros': 'bebidas,cilindros,fitness y tiempo libre,deportes',
    'Bebidas, Mascotas - Cilindros': 'bebidas,cilindros,fitness y tiempo libre,mascotas',
    'Power Bank - ': 'tecnologia,power bank',
    'Tecnología, Outlet - Bocinas': 'tecnologia,gadgets,bocinas',
    'Outlet, Tecnología - Oficina': 'tecnologia,accesorios de oficina',
    'Tecnología - Bocinas': 'tecnologia,bocinas',
    'Tecnología - Audífonos': 'tecnologia,audifonos',
    'Escritura, Tecnología - Oficina': 'tecnologia,oficina,boligrafos',
    'Tecnología, Fitness - Termos': 'tecnologia,gadgets,fitness y tiempo libre,deportes,bebidas,termos',
    'Power Bank, Tecnología - Bocinas': 'tecnologia,power bank,bocinas',
    'Tecnología, Power Bank, Oficina - Oficina': 'tecnologia,power bank',
    'Oficina, Viaje - Oficina': 'tecnologia,accesorios de oficina',
    'Bebidas, Tecnología - Termos': 'bebidas,termos,tecnologia,gadgets',
    'Tecnología, Power Bank - Audífonos': 'tecnologia,power bank,audifonos',
    'Tecnología - Bocinas, Audífonos': 'tecnologia,bocinas,audifonos',
    'Tecnología - Cargadores y power bank': 'tecnologia,cargadores,power bank',
    'Tecnología - Pared y Escritorio': 'tecnologia,gadgets',
    'Bebidas, Tecnología - Audífonos, Termos': 'bebidas,termos,tecnologia,gadgets,audifonos',
    'Oficina, Tecnología - Cargadores y power bank': 'tecnologia,cargadores,power bank,oficina,accesorios de oficina',
    'Tecnología, Hogar, Fitness - ': 'tecnologia,gadgets,fitness y tiempo libre,deportes,hogar,accesorios',
    'Tecnología - Cargadores y power bank, Oficina': 'tecnologia,cargadores,power bank,oficina,accesorios de oficina',
    'Oficina, Ejecutiva - ': 'oficina,accesorios de oficina',
    'Bebidas, Tecnología - Oficina': 'bebidas,tecnologia,gadgets,oficina,accesorios de oficina',
    'Relojes, Tecnología - Cargadores y power bank, Pared y Escritorio, Oficina': 'tecnologia,cargadores,power bank,hogar,relojes de pared y escritorio,oficina,accesorios de oficina',
    'Tecnología, Oficina - Cargadores y power bank': 'tecnologia,cargadores,power bank,oficina,accesorios de oficina',
    'Tecnología, Power Bank - Cargadores y power bank': 'tecnologia,power bank,cargadores',
    'Tecnología, Fitness - Audífonos': 'tecnologia,gadgets,fitness y tiempo libre,deportes,audifonos',
    'Oficina - Cargadores y power bank': 'tecnologia,cargadores,power bank,oficina,accesorios de oficina',
    'Relojes - Cargadores y power bank': 'tecnologia,cargadores,power bank,hogar,relojes de pared y escritorio',
    'Tecnología, Oficina - Bocinas': 'tecnologia,bocinas,oficina,accesorios de oficina',
    'Relojes - Pared y Escritorio, Cargadores y power bank': 'tecnologia,gadgets,hogar,relojes de pared y escritorio,cargadores,power bank',
    'Tecnología, Power Bank - Cargadores y power bank, Audífonos': 'tecnologia,power bank,cargadores,audifonos',
    'Tecnología, Libretas - ': 'tecnologia,gadgets,oficina,libretas',
    'Paraguas - ': 'textil,paraguas e impermeables',
    'Hieleras y Loncheras - ': 'textil,loncheras,hieleras',
    'Hieleras y Loncheras, Escolares y Niños - ': 'textil,loncheras,hieleras,oficina,escolares',
    'Mochilas y Maletas, Escolares y Niños - Backpack': 'textil,mochilas,oficina,escolares',
    'Paraguas, Outlet - ': 'textil,paraguas e impermeables',
    'Mochilas y Maletas - Crossbody': 'textil,mochilas,maletas',
    'Viaje, Belleza - Cosmetiqueras, Neceser': 'hogar,belleza,textil,gorras y cangureras',
    'Viaje, Mochilas y Maletas - Neceser': 'hogar,accesorios,textil,mochilas,gorras y cangureras',
    'Bolsas - Bolsas para Supermercado, Bolsas Shopper': 'textil,bolsas y morrales',
    'Mochilas y Maletas, Fitness - Bolsas Deportivas': 'textil,mochilas,fitness y tiempo libre,deportes',
    'Escolares y Niños, Mochilas y Maletas, Fitness - Bolsas Deportivas': 'textil,mochilas,fitness y tiempo libre,deportes,oficina,escolares',
    'Fitness, Mochilas y Maletas, Viaje - Maletas de Mano, Maletas de Mano': 'textil,maletas,fitness y tiempo libre,deportes',
    'Mochilas y Maletas, Viaje - Maletas rigidas, Maletas de Ruedas': 'textil,maletas',
    'Bolsas - Bolsas Shopper, Bolsas para Supermercado': 'textil,bolsas y morrales',
    'Hieleras y Loncheras, Outlet - ': 'textil,loncheras,hieleras',
    'Mochilas y Maletas - Backpack': 'textil,mochilas',
    'Escolares y Niños, Mochilas y Maletas - Backpack': 'textil,mochilas,oficina,escolares',
    'Viaje, Mochilas y Maletas - Maletas rigidas, Maletas de Ruedas': 'textil,maletas',
    'Mochilas y Maletas - Maletas de Ruedas, Backpack': 'textil,maletas',
    'Ejecutiva, Mochilas y Maletas - Backpack': 'textil,mochilas',
    'Belleza, Escolares y Niños - Cosmetiqueras': 'hogar,belleza,oficina,escolares',
    'Bolsas - Bolsas para Supermercado': 'textil,bolsas y morrales',
    'Mochilas y Maletas, Viaje, Fitness - Maletas de Mano, Backpack': 'textil,mochilas,fitness y tiempo libre,deportes',
    'Viaje, Mochilas y Maletas - Maletas de Mano, Maletas de Mano': 'textil,maletas',
    'Belleza, Viaje - Cosmetiqueras, Neceser': 'hogar,belleza,textil,gorras y cangureras',
    'Viaje, Belleza - Neceser, Cosmetiqueras': 'hogar,belleza,textil,gorras y cangureras',
    'Viaje - Maletas rigidas, Neceser': 'textil,maletas',
    'Bolsas, Viaje - Bolsas de Playa': 'textil,bolsas y morrales',
    'Bolsas, Belleza, Viaje - Bolsas de Playa': 'hogar,belleza,textil,bolsas y morrales',
    'Viaje, Belleza, Bolsas - Neceser, Cosmetiqueras, Bolsas de Playa': 'hogar,belleza,textil,bolsas y morrales',
    'Belleza - Cosmetiqueras': 'hogar,belleza',
    'Viaje, Belleza - Cosmetiqueras': 'hogar,belleza',
    'Fitness, Mochilas y Maletas, Viaje - Cangureras': 'textil,gorras y cangureras,fitness y tiempo libre,deportes',
    'Mochilas y Maletas, Viaje - Maletas rigidas': 'textil,maletas',
    'Mochilas y Maletas, Fitness - Maletas de Mano': 'textil,maletas,fitness y tiempo libre,deportes',
    'Viaje, Campaña Verano, Bolsas - ': 'textil,bolsas y morrales',
    'Viaje, Mochilas y Maletas, Bolsas - Maletas de Mano': 'textil,maletas',
    'Mochilas y Maletas - Backpack, Porta Laptop': 'textil,mochilas,porta laptop',
    'Mochilas y Maletas, Viaje - Backpack': 'textil,mochilas',
    'Viaje, Hieleras y Loncheras - ': 'textil,loncheras,hieleras',
    'Viaje, Bolsas - Bolsas Shopper': 'textil,bolsas y morrales',
    'Fitness, Mochilas y Maletas - Cangureras': 'textil,gorras y cangureras,fitness y tiempo libre,deportes',
    'Viaje, Mochilas y Maletas, Bolsas - Crossbody': 'textil,mochilas,bolsas y morrales',
    'Campaña Verano - ': 'textil,bolsas y morrales',
    'Viaje, Bolsas - Bolsas de Playa': 'textil,bolsas y morrales',
    'Viaje, Belleza, Bolsas - Bolsa Tote': 'hogar,belleza,textil,bolsas y morrales',
    'Viaje, Campaña Verano, Bolsas - Bolsas de Playa': 'textil,bolsas y morrales',
    'Viaje - Neceser': 'textil,gorras y cangureras',
    'Bolsas - Bolsas de Playa, Bolsas Shopper': 'textil,bolsas y morrales',
    'Bolsas - Bolsa Tote': 'textil,bolsas y morrales',
    'Escolares y Niños - ': 'oficina,escolares',
    'Viaje, Mochilas y Maletas - Accesorios de Viaje, Crossbody': 'textil,mochilas,bolsas y morrales',
    'Mochilas y Maletas, Bolsas - Crossbody': 'textil,mochilas,bolsas y morrales',
    'Viaje, Mochilas y Maletas - Crossbody': 'textil,mochilas,bolsas y morrales',
    'Viaje, Fitness, Mochilas y Maletas - Cangureras, Crossbody': 'textil,gorras y cangureras,fitness y tiempo libre,deportes',
    'Hieleras y Loncheras, Hogar, Escolares y Niños - Contenedores de alimentos': 'hogar,oficina,escolares,contenedores de alimentos,textil,loncheras,hieleras',
    'Viaje, Hogar - Accesorios de Viaje, Decoración': 'hogar,accesorios,textil,gorras y cangureras',
    'Paraguas, Campaña Verano - ': 'textil,paraguas e impermeables',
    'Bolsas - Bolsas Shopper': 'textil,bolsas y morrales',
    'Hieleras y Loncheras, Campaña Verano - ': 'textil,loncheras,hieleras',
    'Bolsas, Belleza - Bolsas Shopper, Bolsa Tote': 'textil,bolsas y morrales',
    'Hogar, Campaña Verano, Hieleras y Loncheras - ': 'textil,loncheras,hieleras',
    'Viaje, Bolsas - Bolsa Tote, Bolsas Shopper': 'textil,bolsas y morrales',
    'Mochilas y Maletas, Ejecutiva - Porta Laptop, Crossbody': 'textil,mochilas,porta laptop',
    'Fitness, Viaje, Mochilas y Maletas - Maletas de Mano, Maletas de Mano': 'textil,maletas,fitness y tiempo libre,deportes',
    'Viaje, Bolsas, Belleza - ': 'textil,bolsas y morrales',
    'Hieleras y Loncheras - Neceser': 'textil,gorras y cangureras,loncheras,hieleras',
    'Belleza, Viaje - Neceser, Cosmetiqueras': 'hogar,belleza,textil,gorras y cangureras',
    'Fitness, Mochilas y Maletas - ': 'textil,gorras y cangureras,fitness y tiempo libre,deportes',
    'Mochilas y Maletas, Bolsas - Backpack': 'textil,mochilas,bolsas y morrales',
    'Bolsas - Bolsas de Playa': 'textil,bolsas y morrales',
    'Bolsas - Bolsas para Supermercado, Bolsa Tote': 'textil,bolsas y morrales',
    'Viaje, Bolsas - Bolsa Tote': 'textil,bolsas y morrales',
    'Bolsas - Bolsa Tote, Bolsas para Supermercado': 'textil,bolsas y morrales',
    'Mochilas y Maletas, Viaje - Maletas de Mano, Maletas de Mano': 'textil,maletas',
    'Mochilas y Maletas, Ejecutiva - Backpack': 'textil,mochilas',
    'Hieleras y Loncheras, Campaña Verano, Bolsas - Bolsas de Playa': 'textil,loncheras,hieleras,bolsas y morrales',
    'Fitness, Mochilas y Maletas - Cangureras, Crossbody': 'textil,gorras y cangureras,fitness y tiempo libre,deportes',
    'Belleza, Viaje, Bolsas - Cosmetiqueras': 'hogar,belleza,textil,bolsas y morrales',
    'Viaje, Campaña Verano, Bolsas, Belleza - Bolsas de Playa': 'textil,bolsas y morrales',
    'Bolsas - Bolsa Tote, Bolsas Shopper': 'textil,bolsas y morrales',
    'Viaje, Bolsas - Bolsas Shopper, Bolsas de Playa': 'textil,bolsas y morrales',
    'Mochilas y Maletas, Fitness, Viaje - Maletas de Mano, Backpack, Maletas de Mano': 'textil,mochilas,fitness y tiempo libre,deportes',
    'Campaña Verano, Hieleras y Loncheras - ': 'textil,loncheras,hieleras',
    'Belleza, Viaje - Cosmetiqueras, Accesorios de Viaje': 'hogar,belleza,textil,gorras y cangureras',
    'Bolsas, Mochilas y Maletas - Crossbody': 'textil,mochilas,bolsas y morrales',
    'Viaje, Bolsas - Bolsas Shopper, Bolsa Tote': 'textil,bolsas y morrales',
    'Viaje, Campaña Verano, Bolsas - Bolsas de Playa, Bolsas Shopper': 'textil,bolsas y morrales',
    'Hieleras y Loncheras, Campaña Verano, Viaje - ': 'textil,loncheras,hieleras,bolsas y morrales',
    'Belleza, Campaña Verano, Bolsas - Bolsa Tote': 'hogar,belleza,textil,bolsas y morrales',
    'Mochilas y Maletas - ': 'textil,mochilas y maletas',
    'Belleza, Llaveros, Viaje - ': 'hogar,belleza,llaveros,textil,gorras y cangureras',
    'Escolares y Niños, Belleza - ': 'hogar,belleza,oficina,escolares',
};

function getPrintingTechniques(techniques) {
    const techniquesArray = techniques
        .split(', ')
        .map(tech => printingTechniques[tech]);
    
    return [...new Set(techniquesArray)].join('-');
}

function getMedia(variants, additionalImages, sku) {
    const seenSuffixes = new Set();
    const additionalMedia = additionalImages
        .filter(src => {
            const [, suffix] = src.split('/').pop().split('.')[0].split('_');
            if (seenSuffixes.has(suffix)) return false;
            seenSuffixes.add(suffix);
            return true;
        })
        .map(src => ({
            mediaContentType: 'IMAGE',
            originalSource: src,
        }));

    const variantMedia = variants
        .filter(v => v.Imagen !== 'https:')
        .map(v => ({
            alt: v.Tono,
            mediaContentType: 'IMAGE',
            originalSource: v.Imagen,
        }));

    return [...additionalMedia, ...variantMedia];
}

function getWeight(weight) {
    return weight
        ? parseFloat(weight.replace(/\s*kg\.$/, ''))
        : 0;
}

async function uploadShopifyProduct(input, media) {
    const response = await axios.post(
        process.env.GRAPHQL_URL,
        JSON.stringify({
            query: `
                mutation productCreate($input: ProductInput!, $media: [CreateMediaInput!]) {
                    productCreate(input: $input, media: $media) {
                        product {
                            id
                            media(first: 20) {
                                nodes {
                                    id
                                    alt
                                }
                            }
                        }
                        userErrors {
                            message
                            field
                        }
                    }
                }
            `,
            variables: {
                input,
                media,
            }
        }), {
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': process.env.SHOPIFY_TOKEN,
            }
        }
    );
    // console.log(response.data.data.productCreate.product.media.nodes);

    return response.data.data.productCreate.product;
}

async function uploadVariants(productId, variants) {
    const response = await axios.post(
        process.env.GRAPHQL_URL,
        JSON.stringify({
            query: `
                mutation ProductVariantsCreate($productId: ID!, $strategy: ProductVariantsBulkCreateStrategy, $variants: [ProductVariantsBulkInput!]!) {
                    productVariantsBulkCreate(productId: $productId, strategy: $strategy, variants: $variants) {
                        productVariants {
                            id
                            title
                        }
                        userErrors {
                            message
                            field
                        }
                    }
                }
            `,
            variables: {
                productId,
                strategy: 'REMOVE_STANDALONE_VARIANT', //Usa este argumento para eliminar variante por defecto
                variants,
            }
        }), {
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': process.env.SHOPIFY_TOKEN,
            }
        }
    );
    // console.log(response.data.data.productVariantsBulkCreate.userErrors);

    return response.data.data.productVariantsBulkCreate.productVariants;
}

async function publishProduct(id, input) {
    const response = await axios.post(
        process.env.GRAPHQL_URL,
        JSON.stringify({
            query: `
                mutation publishablePublish($id: ID!, $input: [PublicationInput!]!) {
                    publishablePublish(id: $id, input: $input) {
                        publishable {
                            availablePublicationsCount {
                                count
                            }
                        }
                        userErrors {
                            message
                            field
                        }
                    }
                }
            `,
            variables: {
                id,
                input,
            }
        }), {
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': process.env.SHOPIFY_TOKEN,
            }
        }
    );

    return response.data.data.publishablePublish.publishable;
}

async function uploadProduct(product, locationId, productPublications) {
    try {
        const productTitle = `${product.Nombre.replace(/\.*$/, '')} ${product.Codigo}`;
        const productTags = categories[`${product.Categoria.join(', ')} - ${product.SubCategorias.join(', ')}`];
        const productDetails = await getInnovaProductByCode(product.Codigo);
        const productPrintingTechniques = getPrintingTechniques(productDetails.Tec_Impresion);
        const productInput = {
            handle: productTitle.replace(/[.,]/g, ''),
            title: productTitle.toUpperCase(),
            descriptionHtml: product.Descripcion,
            vendor: 'Innova',
            tags: 'innova,' + productTags,
            metafields: [
                {
                    key: 'superficie',
                    namespace: 'custom',
                    type: 'single_line_text_field',
                    value: surfaces[productDetails.Material],
                },
                {
                    key: 'medidas',
                    namespace: 'custom',
                    type: 'single_line_text_field',
                    value: product['Medidas producto'],
                },
                {
                    key: 'tecnicas_de_impresion',
                    namespace: 'custom',
                    type: 'single_line_text_field',
                    value: productPrintingTechniques,
                },
            ],
            productOptions: [
                {
                    name: 'Color',
                    values: [{
                        name: 'Default',
                    }],
                },
            ],
        };

        const activeVariants = product.Variantes.filter(variant => variant.Tono !== '');
        const productImages = getMedia(activeVariants, product.ImagenesC, product.Codigo);
        const productMedia = [
            {
                mediaContentType: 'IMAGE',
                originalSource: product.ImagenP,
            },
            ...productImages,
        ];

        const productResponse = await uploadShopifyProduct(productInput, productMedia);

        const productId = productResponse.id;
        const productWeight = getWeight(productDetails.Peso_prod);
        const productPrice = parseFloat(product.Precio) / 0.67;

        const productMediaNodes = productResponse.media.nodes;
        const defaultMediaId = productMediaNodes[0].id;

        const productVariants = activeVariants.map(variant => {
            const matchedMedia = productMediaNodes.find(m => m.alt === variant.Tono);
            const mediaId = matchedMedia ? matchedMedia.id : defaultMediaId;

            return {
                inventoryItem: {
                    measurement: {
                        weight: {
                            unit: 'KILOGRAMS',
                            value: productWeight,
                        }
                    },
                    sku: variant['Codigo Variante'],
                    tracked: true,
                },
                mediaId,
                inventoryQuantities: [
                    {
                        availableQuantity: parseInt(variant.Stock),
                        locationId,
                    }
                ],
                optionValues: [
                    {
                        name: variant.Tono,
                        optionName: 'Color',
                    },
                ],
                price: productPrice,
            };
        });
        const variantResponse = await uploadVariants(productId, productVariants);

        const publishResponse = await publishProduct(productId, productPublications);

        console.log(`Variantes de ${product.Codigo} subidas y publicadas en ${publishResponse.availablePublicationsCount.count} canales: ${variantResponse.map(v => v.title).join(', ')}`);
    } catch (error) {
        console.error(`Error subiendo el producto ${product.Nombre} ${product.Codigo}:`, error);
    }
}

module.exports = { uploadProduct };