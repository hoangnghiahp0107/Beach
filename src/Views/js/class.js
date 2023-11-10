class User {
    constructor(nguoi_dung_id, tai_khoan, mat_khau, ho_ten, loai_nguoi_dung, anh_dai_dien) {
        this.nguoi_dung_id = nguoi_dung_id;
        this.tai_khoan = tai_khoan;
        this.mat_khau = mat_khau;
        this.ho_ten = ho_ten;
        this.loai_nguoi_dung = loai_nguoi_dung;
        this.anh_dai_dien = anh_dai_dien;
    }
}

class Images extends User {
    constructor(hinh_id, nguoi_dung_id, ten_hinh, duong_dan){
        super(nguoi_dung_id);
        this.hinh_id = hinh_id;
        this.ten_hinh = ten_hinh;
        this.duong_dan = duong_dan;
    }
}

class New extends User {
    constructor(bao_id, nguoi_dung_id, hinh_id, tieu_de_bao, noi_dung) {
        super(nguoi_dung_id);
        this.bao_id = bao_id;
        this.hinh_id = hinh_id;
        this.tieu_de_bao = tieu_de_bao;
        this.noi_dung = noi_dung;
    }
}

class Comment extends New {
    constructor(binh_luan_id, nguoi_dung_id, bao_id, ngay_binh_luan, noi_dung) {
        super(nguoi_dung_id, bao_id);
        this.binh_luan_id = binh_luan_id;
        this.ngay_binh_luan = ngay_binh_luan;
        this.noi_dung = noi_dung;
    }
}
