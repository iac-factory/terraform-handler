const Flag = (flag: string) => {
    return process.argv.map((argument) => argument.toLocaleLowerCase()).includes(flag);
};

export default Flag;

export { Flag };