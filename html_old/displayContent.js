var DropdownData = [
     {
        "Year" : "2020",
        "Time":["Jun","May","Apr", "Apr","Mar","Jan"],
        "Activities/Experience":[   "Acquiring<a href='https://www.coursera.org/account/accomplishments/professional-cert/7N7T7A29X3QK' target='_blank'> IBM Data Science Specialization Certificate</a> @ Coursera\
                                    <p>Earned after completing ...\
                                    <ol style='margin-left: 10px; padding-left: 10px;'>\
                                    <li><a href='https://www.coursera.org/account/accomplishments/verify/AUUGQPDLYH7C' target='_blank'>What is Data Science?</a></li>\
                                    <li><a href='https://www.coursera.org/account/accomplishments/verify/53MPDS7YGY77' target='_blank'>Tools for Data Science</a></li>\
                                    <li><a href='https://www.coursera.org/account/accomplishments/verify/3CGLPHQFPJ83' target='_blank'>Data Science Methodology</a></li>\
                                    <li><a href='https://www.coursera.org/account/accomplishments/verify/38MDJ8ESQCH7' target='_blank'>Python for Data Science and AI</a></li>\
                                    <li><a href='https://www.coursera.org/account/accomplishments/verify/DHGKRB7PRTCP' target='_blank'>Databases and SQL for Data Science</a></li>\
                                    <li><a href='https://www.coursera.org/account/accomplishments/verify/URTHR3KQ4LLS' target='_blank'>Data Analysis with Python</a></li>\
                                    <li><a href='https://www.coursera.org/account/accomplishments/verify/5AVUVGAFTFWH' target='_blank'>Data Visualization with Python</a></li>\
                                    <li><a href='https://www.coursera.org/account/accomplishments/verify/6V8RMF74T37B' target='_blank'>Machine Learning with Python</a></li>\
                                    <li><a href='https://www.coursera.org/account/accomplishments/verify/JQ2RU8RDDLHW' target='_blank'>Applied Data Science Capstone</a></li>\
                                    </ol></p>"
                                    ,
                                     "<a href='https://www.coursera.org/account/accomplishments/verify/3YQ32LG3KSRD' target='_blank'>Crash Course on Python</a> @ Google", 
                                    "Acquiring<a href='https://www.coursera.org/account/accomplishments/professional-cert/3WVTCP6GYS8J' target='_blank'> IBM AI Engineering Specialization Certificate</a> @ Coursera\
                                    <p>Earned after completing ...\
                                    <ol style='margin-left: 10px; padding-left: 10px;'>\
                                    <li><a href='https://www.coursera.org/account/accomplishments/verify/6V8RMF74T37B' target='_blank'>Machine Learning with Python</a></li>\
                                    <li><a href='https://www.coursera.org/account/accomplishments/verify/RKJTMANZBVHS' target='_blank'>Scalable Machine Learning on Big Data using Apache Spark</a></li>\
                                    <li><a href='https://www.coursera.org/account/accomplishments/verify/FVF94NY6F8D4' target='_blank'>Introduction to Deep Learning & Neural Networks with Keras</a></li>\
                                    <li><a href='https://www.coursera.org/account/accomplishments/verify/KZJ83CWTEMXG' target='_blank'>Deep Neural Networks with PyTorch</a></li>\
                                    <li><a href='https://www.coursera.org/account/accomplishments/verify/62PY86WA9TGX' target='_blank'>Building Deep Learning Models with TensorFlow</a></li>\
                                    <li><a href='https://www.coursera.org/account/accomplishments/verify/BANH8FEJYME3' target='_blank'>AI Capstone Project with Deep Learning</a></li>\
                                    </ol></p>\
                                    ",    
                                    "<a href='https://certificates.mooc.fi/validate/rxz2bdjqpdb' target='_blank'>Elements of AI</a> @ University of Helsinki",   
                                    "FINSPIRE Hackathon",
                                    "<a href='https://courses.nvidia.com/certificates/5baa4dcb2bce4d8a80bd73303cee6e63' target='_blank'>Getting Started with AI on Jetson Nano</a> @ NVIDIA Deep Learning Institute"
                                ]
    },
    {
        "Year" : "2019",
        "Time":["Oct","Summer","Summer","April"],
        "Activities/Experience":[   "<a href='https://www.instagram.com/p/B4HXAbRj5wB/' target='_blank'>SmarTone Hackathon</a>",
                                    "<a href='#' target='_blank'>Work in Murata, WuXi (Intern)</a>",
                                    "<a href='https://www.instagram.com/p/B0FTSRAHbYC/' target='_blank'>Work in Skyworth, ShenZhen (Intern)</a>",
                                    "Hard@UST - Finalist"]
    },{
        "Year" : "2018",
        "Time":["Sep","Summer","Summer", "May", "Jan"],
        "Activities/Experience":[   "Work in RF Tech, Hong Kong (Engineer Trainee)",
                                    "Work in NucTech, Beijing",
                                    "Tongji University - Bauhinia Valley 4th Innovation and Entrepreneurship Training Camp",
                                    "Big Datathon 2018 @ PolyU",
                                    "Cambodia Exchange - Project STARS, PolyU"]
    },{
        "Year" : "2017",
        "Time":["Sep","Sep","Sep", "Summer", "Jan"],
        "Activities/Experience":[   "Project STARS Stage 2 training, (Student Training for Advancement, Relation & Success)",
                                    "Work in Robot Institute of Hong Kong",
                                    "Helper in Robocon Team",
                                    "Joint University (Summer), Feng Chia 2017",
                                    "Myanmar Exchange - Project STARS, PolyU"]
    },{
        "Year" : "2016",
        "Time":["Sep","Summer","Jul", "Mar", "Jan"],
        "Activities/Experience":[   "Project STARS Stage 1 training, (Student Training for Advancement, Relation & Success)",
                                    "Service Learning: Reducing the scientific divide in secondary students through STEM projects",
                                    "Drone Day Camp",
                                    "Startup Weekend, PolyU",
                                    "Entrepreneurial trips to Beijing (Zhongguancun)"]
    },{
        "Year" : "2015",
        "Time":["Sep"],
        "Activities/Experience":["Enter University!!!!!!"]
    }
]

function displayDropdown(){
    document.write("<ul class=\"collapsible\">");
    var dropdownlen = DropdownData.length;
    var i = 0;
    for(i in DropdownData){
        if(i == 0){
            document.write("<li class=\"active\">");
        }else{
            document.write("<li>");
        }
        // document.write("<li class=\"active\">");
        document.write("<div class=\"collapsible-header\"><i class=\"material-icons\">schedule</i>"+DropdownData[i]["Year"]);
        if(i == 0){
            document.write("<span class=\"new badge\">")
        }else{
            document.write("<span class=\"badge\">")
        }
        document.write(DropdownData[i]["Time"].length+"</span></div>");
        document.write("<div class=\"collapsible-body\"><span>\
                        <table>\
                            <tr>\
                            <th>Time</th>\
                            <th>Activities/Experience</th>\
                            </tr>");
        let j = 0;                    
        for(j in DropdownData[i]["Time"]){
            document.write("<tr>\
                            <td>"+ DropdownData[i]["Time"][j]+"</td>\
                            <td>"+ DropdownData[i]["Activities/Experience"][j] +"</td>\
                            </tr>");
        }

        document.write(" </table></span></div>");
    }
    document.write("</ul>");
}

// new_card("blue-grey darken-1",
//         "https://www.befunky.com/images/prismic/2ba00f8e1b504cd1576ff85bd101c2137ea6a02e_landing-photo-to-art-img-4-before.png?auto=webp&format=jpg&width=736",
//         "white-text",
//         "This is my Title",
//         "This is my body")

function new_card(card_color,image,text_color,card_title,card_body,link){
    document.write("\
        <div class=\"card horizontal "+ card_color +"\">\
            <div class=\"card-image\">\
               <img src="+ image +">\
            </div>\
            <div class=\"card-stacked\">\
                <div class=\"card-content "+ text_color +"\">\
                <span class=\"card-title\">"+ card_title +"</span>\
                "+ card_body +"\
                </div>\
                <div class=\"card-action\">\
                <a href=\"http://192.168.0.1\" target=\"_blank\">HTTP:80</a>\
                </div>\
            </div>\
            </div>");
}
