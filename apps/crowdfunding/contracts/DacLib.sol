pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

/**
 * @title Librería de Dacs.
 * @author Mauricio Coronel
 * @notice Librería encargada del tratamiento de Dacs.
 */
library DacLib {

    string
        internal constant ERROR_DAC_NOT_EXISTS = "CROWDFUNDING_DAC_NOT_EXIST";
        
    enum Status {Active, Cancelled}
    /// @dev Estructura que define los datos de una DAC.
    struct Dac {
        uint256 id; // Identificación de la entidad
        uint256 idIndex; // Índice del Id en dacIds;
        string infoCid; // IPFS Content ID de las información (JSON) de la Dac.
        address delegate;
        uint256[] campaignIds; // Ids de las campaigns relacionadas.
        Status status;
    }

    struct Data {
        /// @dev Almacena los ids de la dacs para poder iterar
        /// en el iterable mapping de Dacs
        uint256[] ids;
        /// @dev Iterable Mapping de Dacs
        mapping(uint256 => Dac) dacs;
    }

    function insert(
        Data storage self,
        uint256 id,
        string _infoCid,
        address delegate
    ) public {
        self.ids.push(id);
        uint256 idIndex = self.ids.length - 1;
        Dac memory dac;
        dac.id = id;
        dac.idIndex = idIndex;
        dac.infoCid = _infoCid;
        dac.delegate = delegate;
        dac.status = Status.Active;
        self.dacs[id] = dac;
    }

    /**
     * @notice Obtiene todas las DAC.
     * @return Lista con todas las DACs.
     */
    function toArray(Data storage self)
        public
        view
        returns (Dac[] memory result)
    {
        result = new Dac[](self.ids.length);
        for (uint256 i = 0; i < self.ids.length; i++) {
            result[i] = self.dacs[self.ids[i]];
        }
    }

    function getDac(Data storage self, uint256 _id)
        public
        view
        //dacExists(_id)
        returns (Dac storage)
    {
        require(self.dacs[_id].id != 0, ERROR_DAC_NOT_EXISTS);
        return self.dacs[_id];
    }
}
