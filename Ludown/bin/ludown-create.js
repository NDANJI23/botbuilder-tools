#!/usr/bin/env node
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const program = require('commander');
const fParser = require('../lib/parser');
const chalk = require('chalk');
var pjson = require('../package.json');
let rootFile = "";
program.Command.prototype.unknownOption = function (flag) {
    console.error(chalk.default.redBright(`\n  Unknown arguments: ${process.argv.slice(2).join(' ')}`));
    program.help();
};
program
    .arguments('<file>')
    .name("ludown create")
    .description(`Convert .lu file(s) into JSON and TSV files.`)
    .option('-o, --out_folder <outputFolder>', 'Output folder for all files the tool will generate')
    .option('-q, --quiet', 'Quiet, no trace messages')
    .option('-s, --luis_schema_version <luis_schema_version>', 'LUIS Schema version')
    .option('-v, --luis_versionId <versionId>', 'LUIS app version')
    .option('-n, --luis_name <lName>', 'LUIS app name')
    .option('-d, --luis_desc <desc>', 'LUIS app description')
    .option('-c, --luis_culture <culture>', 'LUIS app culture')
    .option('-i, --lOutFile <luisJSONFileName>', 'LUIS JSON output file name')
    .option('-t, --write_luis_batch_tests', 'Write out LUIS batch test json file')
    .option('-m, --qna_name <qName>', 'QnA KB name')
    .option('-l, --qOutFile <qnaMakerJSONFileName>', 'QnA Maker JSON output file name')
    .option('-e, --qTSVFile <qnaTSVFileName>', 'QnA Maker TSV ouput file name')
    .option('-g, --gen_luis_only','Write generated LUIS JSON to stdout')
    .option('-a, --gen_qna_only', 'Write generated QnA JSON to stdout')
    .action(function(file) {
        rootFile = file;
    })
    .parse(process.argv);
    if(!rootFile) {
        console.log(chalk.default.redBright('\n  No .lu file specified.'));
        program.help();
    } else {
        fParser.handleFile(rootFile, program);
    }
