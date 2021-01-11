var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));

function calculations(params) {
    console.log(params)
    var client_weight = params.weight;
    var client_bodyfat = params.bodyfat;
    console.log(params.weight)
    console.log(params.bodyfat)
    var client_weight_in_lbs = client_weight * 2.20462262185;
    console.log(client_weight_in_lbs)
    var maintenance_cal_low_bar;
    var maintenance_cal_high_bar;

    if (client_bodyfat < 20) {
        console.log("CASE OF LOW BF TRIGGERED")
        maintenance_cal_low_bar = client_weight_in_lbs * 14;
        console.log(maintenance_cal_low_bar);
        maintenance_cal_high_bar = client_weight_in_lbs * 16;
        console.log(maintenance_cal_high_bar);
    } else {
        console.log("CASE OF HIGH BF TRIGGERED")
        var special_lean_body_mass = client_weight_in_lbs - ((client_bodyfat / 100) * client_weight_in_lbs);
        console.log(special_lean_body_mass)
        maintenance_cal_low_bar = special_lean_body_mass * 14;
        console.log(maintenance_cal_low_bar)
        maintenance_cal_high_bar = special_lean_body_mass * 16;
        console.log(maintenance_cal_high_bar)
    }
    var avg_maintenance_cal;
    avg_maintenance_cal = (maintenance_cal_high_bar+maintenance_cal_low_bar)/2
    console.log(avg_maintenance_cal)
    var goal_of_client = params.goal;
    console.log(goal_of_client);
    var factor_of_deficit_or_surplus = params.factor;
    var final_goal_cal;
    if (goal_of_client == "gain") {
        console.log("PATH OF GAIN TRIGGEreD");
        final_goal_cal = avg_maintenance_cal + ((factor_of_deficit_or_surplus / 100) * avg_maintenance_cal)
    } else {
        console.log("PATH OF CUT TRIGGEReD");
        final_goal_cal = avg_maintenance_cal - ((factor_of_deficit_or_surplus / 100) * avg_maintenance_cal)
    }
    console.log(final_goal_cal);
    // NOW WE WILL DO MACROs DISTRIBUTION
    // fats
    var low_bar_of_fats = (15 / 100) * final_goal_cal;
    console.log(low_bar_of_fats);
    var high_bar_of_fats = (25 / 100) * final_goal_cal;
    console.log(high_bar_of_fats);
    var final_fat_kal = (high_bar_of_fats + low_bar_of_fats)/2
    console.log(final_fat_kal);
    var macro_count_of_fats = final_fat_kal/9;
    console.log(macro_count_of_fats);
    // protein 
    var low_range_of_protein;
    var high_range_of_protein;
    if (goal_of_client == "gain") {
        console.log("PROTEIN RANGE FOR GAIN TRIGGERED");
        low_range_of_protein = 1.1 * client_weight_in_lbs;
        high_range_of_protein = 1.35 * client_weight_in_lbs;
    } else {
        console.log("PROTEIN RANGE FOR CUT TRIGGERED");
        low_range_of_protein = 1.3 * client_weight_in_lbs;
        high_range_of_protein = 1.7 * client_weight_in_lbs;
    }
    final_gram_of_protein = (high_range_of_protein + low_range_of_protein) /2
    console.log(final_gram_of_protein);
    final_cal_count_for_protein = final_gram_of_protein * 4;
    console.log(final_cal_count_for_protein);
    // carbs
    var carbs_cal = final_goal_cal - final_fat_kal - final_cal_count_for_protein;
    console.log("MAINTENANCE KAL");
    console.log(final_goal_cal);
    console.log("PROTIEN KAL");
    console.log(final_cal_count_for_protein);
    console.log("FAT KAL");
    console.log(final_fat_kal);
    console.log("CARB KAL");
    console.log(carbs_cal);
    macro_for_carbs = carbs_cal / 4;

    console.log("SOOOOO FINALLY");
    console.log(final_goal_cal);
    // FATS
    console.log(macro_count_of_fats);
    // PROTEIN
    console.log(final_gram_of_protein);
    // CARBS
    console.log(macro_for_carbs);
    return { Total_kal : final_goal_cal, fat_kal : macro_count_of_fats, protein_kal : final_gram_of_protein, carb_kal : macro_for_carbs };
}

app.get("/", function (req,res) {
    res.render("index.ejs",{answer : ""});
})

app.post("/result", function (req, res) {
    var data = calculations(req.body);
    res.render("index.ejs", {
        stats : data,
    })
})

app.listen(process.env.PORT || 3000, function () {
    console.log("SERVER 3000 HAS STARTED");
});
