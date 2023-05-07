const DinerData = {
    'roznakuhna': {
        'image': require('./DinerImages/roznakuhna.png'),
        'description': "To je opis restavracije Rožna kuhna"
    },
    
    'marjeticatobacna': {
        'image': require('./DinerImages/marjeticatobacna.png'),
        'description': "To je opis restavracije Marjetica Tobačna"
    },
    
    'marjeticabelinka': {
        'image': require('./DinerImages/marjeticabelinka.png'),
        'description': "To je opis restavracije Marjetica Belinka"
    },
    'menzaijs': {
        'image': require('./DinerImages/menzaijs.png'),
        'description': "To je opis restavracije Menza IJS"
    },
    'menzabf': {
        'image': require('./DinerImages/menzabf.png'),
        'description': "To je opis restavracije Menza BF"
    },
    'ddvic': {
        'image': require('./DinerImages/ddvic.png'),
        'description': "To je opis restavracije DDVic"
    },
    'menzafe': {
        'image': require('./DinerImages/menzafe.png'),
        'description': "To je opis restavracije Menza FE"
    },
    'menzapf': {
        'image': require('./DinerImages/menzapf.png'),
        'description': "To je opis restavracije Menza PF"
    },
}

const DinerInfo = (props) => {
    if (props in DinerData) {
        return DinerData[props];
    } else {
        return {
            image: require("./DinerImages/fallbackImage.png"),
            description: "Opis restavracije ni na voljo.",
        };
    }
};
export default DinerInfo;
