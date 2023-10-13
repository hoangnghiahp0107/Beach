class User{
    constructor(nguoi_dung_id,tai_khoan,mat_khau,ho_ten,anh_dai_dien){
        this.nguoi_dung_id = nguoi_dung_id;
        this.tai_khoan = tai_khoan;
        this.mat_khau = mat_khau;
        this.ho_ten = ho_ten;
        this.anh_dai_dien = anh_dai_dien;
    }
}

class New extends User{
    constructor(bao_id, nguoi_dung_id, hinh_id, tieu_de_bao, noi_dung){
        super(nguoi_dung_id);
        this.bao_id = bao_id;
        this.hinh_id = hinh_id;
        this.tieu_de_bao = tieu_de_bao;
        this.noi_dung = noi_dung;
    }
}